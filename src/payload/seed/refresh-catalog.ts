import path from 'path'
import type { Payload } from 'payload'

import {
  buildPriceJSON,
  buildProductLayout,
  buildProductName,
  CATALOG_ASSETS,
  CATALOG_CATEGORIES,
  DEMO_CATEGORY_MEDIA,
  formatSlug,
  getCatalogCategory,
} from './catalog'

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

const extractCategoryNumber = (title: string): number | null => {
  const match = title.match(/^Category (\d+)$/)
  return match ? Number.parseInt(match[1], 10) : null
}

const extractProductNumber = (title: string): number | null => {
  const match = title.match(/^Product (\d+)$/)
  return match ? Number.parseInt(match[1], 10) : null
}

export const ensureCatalogMedia = async (payload: Payload): Promise<Record<string, string>> => {
  const assetsDir = path.resolve(__dirname, 'assets')
  const mediaMap: Record<string, string> = {}

  payload.logger.info('— Ensuring catalog media assets...')

  for (const asset of CATALOG_ASSETS) {
    const existing = await payload.find({
      collection: 'media',
      where: {
        alt: {
          equals: asset.alt,
        },
      },
      limit: 1,
    })

    if (existing.docs[0]) {
      mediaMap[asset.key] = existing.docs[0].id
      continue
    }

    const doc = await payload.create({
      collection: 'media',
      filePath: path.resolve(assetsDir, asset.file),
      data: {
        alt: asset.alt,
      },
    })

    mediaMap[asset.key] = doc.id
  }

  payload.logger.info(`   ${Object.keys(mediaMap).length} catalog images ready`)

  return mediaMap
}

export const refreshCatalog = async (payload: Payload): Promise<void> => {
  const batchSize = Number.parseInt(process.env.SEED_BATCH_SIZE || '50', 10)
  const mediaMap = await ensureCatalogMedia(payload)

  payload.logger.info('— Updating categories with realistic names and images...')

  const categories = await payload.find({
    collection: 'categories',
    limit: 1000,
    pagination: false,
  })

  let categoriesUpdated = 0

  for (const batch of chunk(categories.docs, batchSize)) {
    await Promise.all(
      batch.map(async category => {
        const categoryNumber = extractCategoryNumber(category.title)
        const demoImageKey = DEMO_CATEGORY_MEDIA[category.title]

        if (categoryNumber) {
          const catalogCategory = getCatalogCategory(categoryNumber)

          await payload.update({
            collection: 'categories',
            id: category.id,
            data: {
              title: catalogCategory.name,
              media: mediaMap[catalogCategory.imageKey],
            },
          })

          categoriesUpdated += 1
          return
        }

        if (demoImageKey && mediaMap[demoImageKey]) {
          await payload.update({
            collection: 'categories',
            id: category.id,
            data: {
              media: mediaMap[demoImageKey],
            },
          })

          categoriesUpdated += 1
        }
      }),
    )
  }

  payload.logger.info(`   ${categoriesUpdated} categories updated`)

  payload.logger.info('— Updating products with realistic names, descriptions, and images...')

  const categoryLookup = new Map<string, string>()

  const refreshedCategories = await payload.find({
    collection: 'categories',
    limit: 1000,
    pagination: false,
  })

  refreshedCategories.docs.forEach(category => {
    categoryLookup.set(category.id, category.title)
  })

  let page = 1
  let hasNextPage = true
  let productsUpdated = 0

  while (hasNextPage) {
    const products = await payload.find({
      collection: 'products',
      limit: batchSize,
      page,
    })

    if (!products.docs.length) {
      break
    }

    const bulkProducts = products.docs.filter(product => extractProductNumber(product.title))

    await Promise.all(
      bulkProducts.map(async product => {
        const productNumber = extractProductNumber(product.title)

        if (!productNumber) {
          return
        }

        const categoryId =
          typeof product.categories?.[0] === 'string'
            ? product.categories[0]
            : product.categories?.[0]?.id

        const categoryTitle = categoryId ? categoryLookup.get(categoryId) : undefined
        const catalogCategory =
          CATALOG_CATEGORIES.find(entry => entry.name === categoryTitle) ||
          getCatalogCategory(productNumber)

        const title = buildProductName(catalogCategory, productNumber)
        const imageId = mediaMap[catalogCategory.imageKey]

        await payload.update({
          collection: 'products',
          id: product.id,
          data: {
            title,
            slug: `${formatSlug(title)}-${productNumber}`,
            skipSync: true,
            meta: {
              title,
              description: `${title} available now in ${catalogCategory.name}.`,
              ...(imageId ? { image: imageId } : {}),
            },
            layout: buildProductLayout(title, catalogCategory.name),
            priceJSON: buildPriceJSON(productNumber, catalogCategory),
          },
        })

        productsUpdated += 1
      }),
    )

    hasNextPage = products.hasNextPage
    page += 1

    if (productsUpdated > 0 && productsUpdated % 500 === 0) {
      payload.logger.info(`   ${productsUpdated} products updated`)
    }
  }

  payload.logger.info(`   ${productsUpdated} products updated`)
  payload.logger.info('Catalog refresh completed successfully!')
}
