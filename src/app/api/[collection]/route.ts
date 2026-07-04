import qs from 'qs'
import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '../../../payload/payloadClient'

const allowedCollections = new Set([
  'categories',
  'media',
  'orders',
  'pages',
  'products',
  'users',
])

const parseQuery = (search: string) => {
  return qs.parse(search, {
    ignoreQueryPrefix: true,
    depth: 10,
  }) as {
    where?: Record<string, unknown>
    sort?: string
    limit?: string | number
    page?: string | number
    depth?: string | number
    draft?: string
    locale?: string
    fallbackLocale?: string
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { collection: string } },
) {
  const { collection } = params

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ message: 'Collection not found' }, { status: 404 })
  }

  try {
    const payload = await getPayloadClient()
    const query = parseQuery(req.nextUrl.search)

    const result = await payload.find({
      collection: collection as 'products',
      where: query.where,
      sort: query.sort,
      limit: query.limit ? Number(query.limit) : undefined,
      page: query.page ? Number(query.page) : undefined,
      depth: query.depth ? Number(query.depth) : 1,
      draft: query.draft === 'true',
      locale: query.locale,
      fallbackLocale: query.fallbackLocale,
      overrideAccess: false,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to fetch collection',
      },
      { status: 500 },
    )
  }
}
