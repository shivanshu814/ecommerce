import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '../../../../payload/payloadClient'
import { getAuthenticatedUser, getTokenFromRequest } from '../../_utilities/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)

    if (!authUser) {
      return NextResponse.json({ user: null })
    }

    const token = getTokenFromRequest(req)

    return NextResponse.json(
      { user: authUser, token },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  } catch {
    return NextResponse.json({ user: null })
  }
}
