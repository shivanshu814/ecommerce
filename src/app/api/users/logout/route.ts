import { NextResponse } from 'next/server'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 0,
}

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully.' })
  response.cookies.set('payload-token', '', cookieOptions)
  return response
}
