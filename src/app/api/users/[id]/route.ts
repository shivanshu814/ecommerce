import { NextRequest, NextResponse } from 'next/server'

import { canUpdateUser, getAuthenticatedUser } from '../../_utilities/auth'
import { getPayloadClient } from '../../../../payload/payloadClient'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)
    const depth = req.nextUrl.searchParams.get('depth')

    if (!authUser) {
      return NextResponse.json({ errors: [{ message: 'You are not authorized to perform this action.' }] }, { status: 401 })
    }

    if (!canUpdateUser(authUser, params.id)) {
      return NextResponse.json({ errors: [{ message: 'You are not authorized to perform this action.' }] }, { status: 403 })
    }

    const doc = await payload.findByID({
      collection: 'users',
      id: params.id,
      depth: depth ? Number(depth) : 1,
      user: authUser,
      overrideAccess: false,
    })

    return NextResponse.json(doc)
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Unable to fetch user',
      },
      { status: 404 },
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)

    if (!authUser) {
      return NextResponse.json({ errors: [{ message: 'You are not authorized to perform this action.' }] }, { status: 401 })
    }

    if (!canUpdateUser(authUser, params.id)) {
      return NextResponse.json({ errors: [{ message: 'You are not authorized to perform this action.' }] }, { status: 403 })
    }

    const data = await req.json()

    const doc = await payload.update({
      collection: 'users',
      id: params.id,
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
            message: error instanceof Error ? error.message : 'Unable to update user',
          },
        ],
      },
      { status: 400 },
    )
  }
}
