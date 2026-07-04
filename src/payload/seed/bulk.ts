import type { Payload } from 'payload'

import {
  buildPriceJSON,
  buildProductLayout,
  buildProductName,
  getCatalogCategory,
} from './catalog'
import { ensureCatalogMedia } from './refresh-catalog'
import { convertUsdCentsToInrPaise } from '../../constants/currency'
import { seedUsers } from './users'

type BulkSeedOptions = {
  categoryCount?: number
  productCount?: number
  userCount?: number
  orderCount?: number
  batchSize?: number
}

const parseCount = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value || '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const getBulkSeedOptions = (): Required<BulkSeedOptions> => ({
  categoryCount: parseCount(process.env.SEED_CATEGORY_COUNT, 100),
  productCount: parseCount(process.env.SEED_PRODUCT_COUNT, 5000),
  userCount: parseCount(process.env.SEED_USER_COUNT, 1000),
  orderCount: parseCount(process.env.SEED_ORDER_COUNT, 10000),
  batchSize: parseCount(process.env.SEED_BATCH_SIZE, 50),
})

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

export const seedBulk = async (payload: Payload, options: BulkSeedOptions = {}): Promise<void> => {
  const {
    categoryCount,
    productCount,
    userCount,
    orderCount,
    batchSize,
  } = {
    ...getBulkSeedOptions(),
    ...options,
  }

  payload.logger.info(
    `— Seeding bulk data (${categoryCount} categories, ${productCount} products, ${userCount} users, ${orderCount} orders)...`,
  )

  const { customerIds } = await seedUsers(payload, {
    customerCount: userCount,
    batchSize,
    clearExisting: true,
  })

  const mediaMap = await ensureCatalogMedia(payload)

  payload.logger.info(`— Seeding ${categoryCount} categories...`)

  const categoryDocs = []

  for (const batch of chunk(Array.from({ length: categoryCount }, (_, index) => index + 1), batchSize)) {
    const created = await Promise.all(
      batch.map(index => {
        const catalogCategory = getCatalogCategory(index)

        return payload.create({
          collection: 'categories',
          data: {
            title: catalogCategory.name,
            media: mediaMap[catalogCategory.imageKey],
          },
        })
      }),
    )

    categoryDocs.push(...created)
  }

  const categoryIds = categoryDocs.map(doc => doc.id)

  payload.logger.info(`— Seeding ${productCount} products...`)

  const productDocs = []

  for (const batch of chunk(Array.from({ length: productCount }, (_, index) => index + 1), batchSize)) {
    const created = await Promise.all(
      batch.map(index => {
        const catalogCategory = getCatalogCategory(index)
        const title = buildProductName(catalogCategory, index)
        const imageId = mediaMap[catalogCategory.imageKey]

        return payload.create({
          collection: 'products',
          data: {
            title,
            slug: `product-${index}`,
            _status: 'published',
            skipSync: true,
            categories: [categoryIds[(index - 1) % categoryIds.length]],
            meta: {
              title,
              description: `${title} available now in ${catalogCategory.name}.`,
              ...(imageId ? { image: imageId } : {}),
            },
            layout: buildProductLayout(title, catalogCategory.name),
            priceJSON: buildPriceJSON(index, catalogCategory),
          },
        })
      }),
    )

    productDocs.push(...created)

    if (productDocs.length % 500 === 0 || productDocs.length === productCount) {
      payload.logger.info(`   ${productDocs.length}/${productCount} products created`)
    }
  }

  const productIds = productDocs.map(doc => doc.id)

  payload.logger.info(`— Seeding ${orderCount} orders...`)

  let ordersCreated = 0

  for (const batch of chunk(Array.from({ length: orderCount }, (_, index) => index + 1), batchSize)) {
    await Promise.all(
      batch.map(index => {
        const productId = productIds[(index - 1) % productIds.length]
        const userId = customerIds[(index - 1) % customerIds.length]
        const catalogCategory = getCatalogCategory(index)
        const quantity = (index % 3) + 1
        const unitPrice = convertUsdCentsToInrPaise(
          catalogCategory.priceMin +
            ((index * 7919) % (catalogCategory.priceMax - catalogCategory.priceMin || 1)),
        )
        const total = unitPrice * quantity

        return payload.create({
          collection: 'orders',
          data: {
            orderedBy: userId,
            total,
            items: [
              {
                product: productId,
                price: unitPrice,
                quantity,
              },
            ],
          },
        })
      }),
    )

    ordersCreated += batch.length

    if (ordersCreated % 1000 === 0 || ordersCreated === orderCount) {
      payload.logger.info(`   ${ordersCreated}/${orderCount} orders created`)
    }
  }

  payload.logger.info('Bulk seed completed successfully!')
}
