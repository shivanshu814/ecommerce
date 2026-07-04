import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '../../../../payload/payloadClient'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const body = await req.json()

    const result = await payload.login({
      collection: 'users',
      data: {
        email: body.email,
        password: body.password,
      },
    })

    const response = NextResponse.json(result)

    if (result.token) {
      response.cookies.set('payload-token', result.token, cookieOptions)
    }

    return response
  } catch {
    return NextResponse.json({ errors: [{ message: 'Invalid credentials' }] }, { status: 401 })
  }
}
