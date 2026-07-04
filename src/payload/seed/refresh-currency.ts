// @ts-nocheck
import type { Payload } from 'payload'

import { convertPriceJSONToInr, convertUsdCentsToInrPaise } from '../../constants/currency'

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

export const refreshCurrency = async (payload: Payload): Promise<void> => {
  const batchSize = Number.parseInt(process.env.SEED_BATCH_SIZE || '50', 10)

  payload.logger.info('— Converting product prices to INR...')

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

    await Promise.all(
      products.docs.map(async product => {
        if (!product.priceJSON) {
          return
        }

        const nextPriceJSON = convertPriceJSONToInr(product.priceJSON)

        if (nextPriceJSON === product.priceJSON) {
          return
        }

        await payload.update({
          collection: 'products',
          id: product.id,
          data: {
            priceJSON: nextPriceJSON,
            skipSync: true,
          },
        })

        productsUpdated += 1
      }),
    )

    hasNextPage = products.hasNextPage
    page += 1
  }

  payload.logger.info(`   ${productsUpdated} products converted to INR`)

  payload.logger.info('— Converting order totals to INR...')

  let ordersUpdated = 0
  page = 1
  hasNextPage = true

  while (hasNextPage) {
    const orders = await payload.find({
      collection: 'orders',
      limit: batchSize,
      page,
    })

    if (!orders.docs.length) {
      break
    }

    await Promise.all(
      orders.docs.map(async order => {
        const nextTotal = convertUsdCentsToInrPaise(order.total)
        const nextItems = order.items?.map(item => ({
          ...item,
          price: item.price ? convertUsdCentsToInrPaise(item.price) : item.price,
        }))

        if (nextTotal === order.total) {
          return
        }

        await payload.update({
          collection: 'orders',
          id: order.id,
          data: {
            total: nextTotal,
            items: nextItems,
          },
        })

        ordersUpdated += 1
      }),
    )

    hasNextPage = orders.hasNextPage
    page += 1

    if (ordersUpdated > 0 && ordersUpdated % 1000 === 0) {
      payload.logger.info(`   ${ordersUpdated} orders converted to INR`)
    }
  }

  payload.logger.info(`   ${ordersUpdated} orders converted to INR`)
  payload.logger.info('Currency refresh completed successfully!')
}
