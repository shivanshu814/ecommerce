import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import payload from 'payload'

import { seedBulk } from './bulk'

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  await seedBulk(payload, {
    categoryCount: Number.parseInt(process.env.SEED_CATEGORY_COUNT || '25', 10),
    productCount: Number.parseInt(process.env.SEED_PRODUCT_COUNT || '150', 10),
    userCount: Number.parseInt(process.env.SEED_USER_COUNT || '100', 10),
    orderCount: Number.parseInt(process.env.SEED_ORDER_COUNT || '0', 10),
    batchSize: Number.parseInt(process.env.SEED_BATCH_SIZE || '25', 10),
    skipUsers: true,
  })

  payload.logger.info('Bulk data seed completed.')
  process.exit(0)
}

start()
