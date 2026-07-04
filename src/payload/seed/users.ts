import type { Payload } from 'payload'

export type SeedUserAccount = {
  name: string
  email: string
  password: string
  roles: Array<'admin' | 'customer'>
}

export const SEED_ADMIN_ACCOUNTS: SeedUserAccount[] = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
    roles: ['admin'],
  },
  {
    name: 'Store Manager',
    email: 'manager@example.com',
    password: 'Manager@123',
    roles: ['admin'],
  },
]

export const SEED_SAMPLE_CUSTOMERS: SeedUserAccount[] = [
  {
    name: 'Demo Customer',
    email: 'customer@example.com',
    password: 'Customer@123',
    roles: ['customer'],
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Customer@123',
    roles: ['customer'],
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Customer@123',
    roles: ['customer'],
  },
]

type SeedUsersOptions = {
  clearExisting?: boolean
  customerCount?: number
  batchSize?: number
}

const parseCount = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value || '', 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

const createUser = async (payload: Payload, account: SeedUserAccount) => {
  return payload.create({
    collection: 'users',
    data: {
      name: account.name,
      email: account.email,
      password: account.password,
      roles: account.roles,
      skipSync: true,
    },
  })
}

export const logSeedCredentials = (payload: Payload, customerCount: number): void => {
  payload.logger.info('—— Seeded account credentials ——')
  payload.logger.info('Admins (CMS: http://localhost:3000/admin):')

  SEED_ADMIN_ACCOUNTS.forEach(account => {
    payload.logger.info(`  ${account.email} / ${account.password}`)
  })

  payload.logger.info('Sample customers (storefront login):')
  SEED_SAMPLE_CUSTOMERS.forEach(account => {
    payload.logger.info(`  ${account.email} / ${account.password}`)
  })

  if (customerCount > 0) {
    payload.logger.info(`Bulk customers (${customerCount} total):`)
    payload.logger.info(`  customer-1@example.com ... customer-${customerCount}@example.com / Customer@123`)
  }
}

export const seedUsers = async (
  payload: Payload,
  options: SeedUsersOptions = {},
): Promise<{ adminIds: string[]; customerIds: string[] }> => {
  const customerCount = options.customerCount ?? parseCount(process.env.SEED_USER_COUNT, 100)
  const batchSize = options.batchSize ?? parseCount(process.env.SEED_BATCH_SIZE, 50)
  const clearExisting = options.clearExisting ?? true

  payload.logger.info(`— Seeding users (${SEED_ADMIN_ACCOUNTS.length} admins, ${SEED_SAMPLE_CUSTOMERS.length} sample customers, ${customerCount} bulk customers)...`)

  if (clearExisting) {
    await payload.delete({
      collection: 'orders',
      where: {},
    })

    await payload.delete({
      collection: 'users',
      where: {},
    })
  }

  const adminDocs = await Promise.all(SEED_ADMIN_ACCOUNTS.map(account => createUser(payload, account)))
  const sampleCustomerDocs = await Promise.all(
    SEED_SAMPLE_CUSTOMERS.map(account => createUser(payload, account)),
  )

  const bulkCustomerDocs = []

  for (const batch of chunk(Array.from({ length: customerCount }, (_, index) => index + 1), batchSize)) {
    const created = await Promise.all(
      batch.map(index =>
        createUser(payload, {
          name: `Customer ${index}`,
          email: `customer-${index}@example.com`,
          password: 'Customer@123',
          roles: ['customer'],
        }),
      ),
    )

    bulkCustomerDocs.push(...created)
  }

  const adminIds = adminDocs.map(doc => doc.id)
  const customerIds = [...sampleCustomerDocs, ...bulkCustomerDocs].map(doc => doc.id)

  logSeedCredentials(payload, customerCount)

  return { adminIds, customerIds }
}
