import { NextRequest, NextResponse } from 'next/server'

import { canUpdateUser, getAuthenticatedUser } from '../../_utilities/auth'
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { collection: string; id: string } },
) {
  const { collection, id } = params

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ message: 'Collection not found' }, { status: 404 })
  }

  if (collection !== 'users') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)

    if (!authUser) {
      return NextResponse.json({ errors: [{ message: 'You are not authorized to perform this action.' }] }, { status: 401 })
    }

    if (!canUpdateUser(authUser, id)) {
      return NextResponse.json({ errors: [{ message: 'You are not authorized to perform this action.' }] }, { status: 403 })
    }

    const data = await req.json()

    const doc = await payload.update({
      collection: 'users',
      id,
      data,
      user: authUser,
      overrideAccess: false,
    })

    return NextResponse.json({
      message: 'Updated successfully.',
      doc,
    })
  } catch (error) {
    return NextResponse.json(
      {
        errors: [
          {
            message: error instanceof Error ? error.message : 'Unable to update document',
          },
        ],
      },
      { status: 400 },
    )
  }
}
