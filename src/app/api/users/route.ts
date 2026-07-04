import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '../../../payload/payloadClient'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const data = await req.json()

    const doc = await payload.create({
      collection: 'users',
      data: {
        ...data,
        roles: ['customer'],
      },
      overrideAccess: false,
    })

    return NextResponse.json({
      message: 'User created successfully.',
      doc,
    })
  } catch (error) {
    return NextResponse.json(
      {
        errors: [
          {
            message: error instanceof Error ? error.message : 'Unable to create user',
          },
        ],
      },
      { status: 400 },
    )
  }
}
