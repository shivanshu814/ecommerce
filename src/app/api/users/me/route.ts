import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getPayloadClient } from '../../../../payload/payloadClient'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const token = cookies().get('payload-token')?.value

    if (!token || !process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ user: null })
    }

    const decoded = jwt.verify(token, process.env.PAYLOAD_SECRET) as { id: string }

    const user = await payload.findByID({
      collection: 'users',
      id: decoded.id,
      depth: 0,
      overrideAccess: false,
    })

    return NextResponse.json({ user, token })
  } catch {
    return NextResponse.json({ user: null })
  }
}
