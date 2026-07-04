import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import type { Payload } from 'payload'

import type { User } from '../../../payload/payload-types'
import { checkRole } from '../../../payload/collections/Users/checkRole'

const getTokenFromRequest = (req?: NextRequest): string | undefined => {
  if (req) {
    const cookieToken = req.cookies.get('payload-token')?.value
    if (cookieToken) {
      return cookieToken
    }

    const authHeader = req.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.slice(7)
    }

    const cookieHeader = req.headers.get('cookie')
    if (cookieHeader) {
      const match = cookieHeader.match(/(?:^|;\s*)payload-token=([^;]+)/)
      if (match?.[1]) {
        return decodeURIComponent(match[1])
      }
    }
  }

  return cookies().get('payload-token')?.value
}

export const getAuthenticatedUser = async (
  payload: Payload,
  req?: NextRequest,
): Promise<User | null> => {
  const token = getTokenFromRequest(req)

  if (!token || !process.env.PAYLOAD_SECRET) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.PAYLOAD_SECRET) as { id: string }

    return (await payload.findByID({
      collection: 'users',
      id: decoded.id,
      depth: 0,
      overrideAccess: true,
    })) as User
  } catch {
    return null
  }
}

export const canUpdateUser = (authUser: User, targetUserId: string): boolean => {
  if (authUser.id === targetUserId) {
    return true
  }

  return checkRole(['admin'], authUser)
}
