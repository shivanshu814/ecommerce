import type { Config } from '../../payload/payload-types'
import { getPayloadClient } from '../../payload/payloadClient'

export const fetchDoc = async <T>(args: {
  collection: keyof Config['collections']
  slug?: string
  id?: string
  draft?: boolean
  depth?: number
}): Promise<T> => {
  const { collection, slug, id, draft, depth = 2 } = args || {}

  const payload = await getPayloadClient()

  if (id) {
    const doc = await payload.findByID({
      collection: collection as 'products',
      id,
      draft: draft || false,
      depth,
    })

    return doc as T
  }

  const result = await payload.find({
    collection: collection as 'products',
    draft: draft || false,
    depth,
    limit: 1,
    where: slug
      ? {
          slug: {
            equals: slug,
          },
        }
      : {},
  })

  return result.docs[0] as T
}
