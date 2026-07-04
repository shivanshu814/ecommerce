import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'

import { seed } from './payload/seed'
import { refreshBrand } from './payload/seed/refresh-brand'
import { refreshCatalog } from './payload/seed/refresh-catalog'
import { refreshCurrency } from './payload/seed/refresh-currency'
import { seedUsers } from './payload/seed/users'

const app = express()
const PORT = process.env.PORT || 3000

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  if (process.env.PAYLOAD_SEED_USERS === 'true') {
    await seedUsers(payload, {
      customerCount: Number.parseInt(process.env.SEED_USER_COUNT || '100', 10),
      clearExisting: true,
    })
    process.exit()
  }

  if (process.env.PAYLOAD_REFRESH_CATALOG === 'true') {
    await refreshCatalog(payload)
    process.exit()
  }

  if (process.env.PAYLOAD_REFRESH_CURRENCY === 'true') {
    await refreshCurrency(payload)
    process.exit()
  }

  if (process.env.PAYLOAD_REFRESH_BRAND === 'true') {
    await refreshBrand(payload)
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
    })
  })
}

start()
