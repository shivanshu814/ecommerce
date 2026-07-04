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

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, payload.secret) as {
      id: string
      collection?: string
    }

    if (decoded.collection && decoded.collection !== 'users') {
      return null
    }

    const users = await payload.find({
      collection: 'users',
      where: {
        id: {
          equals: decoded.id,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    return (users.docs[0] as User) || null
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
