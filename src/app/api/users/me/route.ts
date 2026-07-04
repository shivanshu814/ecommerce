import { NextRequest, NextResponse } from 'next/server'

import { getAuthenticatedUser } from '../../_utilities/auth'
import { getPayloadClient } from '../../../../payload/payloadClient'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)

    if (!authUser) {
      return NextResponse.json({ user: null })
    }

    const token = req.cookies.get('payload-token')?.value

    return NextResponse.json({ user: authUser, token })
  } catch {
    return NextResponse.json({ user: null })
  }
}
