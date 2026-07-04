import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '../../../../payload/payloadClient'

const allowedCollections = new Set([
  'categories',
  'media',
  'orders',
  'pages',
  'products',
  'users',
])

export async function GET(
  req: NextRequest,
  { params }: { params: { collection: string; id: string } },
) {
  const { collection, id } = params

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ message: 'Collection not found' }, { status: 404 })
  }

  try {
    const payload = await getPayloadClient()
    const depth = req.nextUrl.searchParams.get('depth')

    const doc = await payload.findByID({
      collection: collection as 'products',
      id,
      depth: depth ? Number(depth) : 1,
      overrideAccess: false,
    })

    return NextResponse.json(doc)
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to fetch document',
      },
      { status: 404 },
    )
  }
}
