import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import type { Payload } from 'payload'

import type { User } from '../../../payload/payload-types'
import { checkRole } from '../../../payload/collections/Users/checkRole'

export const getTokenFromRequest = (req?: NextRequest): string | undefined => {
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

const verifyAuthToken = (
  token: string,
  payload: Payload,
): { id: string; collection?: string; email?: string } | null => {
  const secrets = [payload.secret, process.env.PAYLOAD_SECRET].filter(
    (secret, index, array): secret is string =>
      Boolean(secret) && array.indexOf(secret) === index,
  )

  for (const secret of secrets) {
    try {
      return jwt.verify(token, secret) as {
        id: string
        collection?: string
        email?: string
      }
    } catch {
      continue
    }
  }

  return null
}

export const getAuthenticatedUser = async (
  payload: Payload,
  req?: NextRequest,
): Promise<User | null> => {
  const token = getTokenFromRequest(req)

  if (!token) {
    return null
  }

  const decoded = verifyAuthToken(token, payload)

  if (!decoded) {
    return null
  }

  if (decoded.collection && decoded.collection !== 'users') {
    return null
  }

  try {
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

    if (users.docs[0]) {
      return users.docs[0] as User
    }
  } catch {
    // Fall back to verified JWT claims if the database lookup fails.
  }

  return {
    id: decoded.id,
    email: decoded.email || '',
    roles: ['customer'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as User
}

export const canUpdateUser = (authUser: User, targetUserId: string): boolean => {
  if (authUser.id === targetUserId) {
    return true
  }

  return checkRole(['admin'], authUser)
}
