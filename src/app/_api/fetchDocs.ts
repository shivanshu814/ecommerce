import type { Config } from '../../payload/payload-types'
import { getPayloadClient } from '../../payload/payloadClient'

export const fetchDocs = async <T>(
  collection: keyof Config['collections'],
  draft?: boolean,
  depth = 1,
): Promise<T[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: collection as 'products',
    draft: draft || false,
    depth,
    limit: 300,
  })

  return result.docs as T[]
}
