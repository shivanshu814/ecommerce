import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { Payload } from 'payload'

import type { User } from '../../../payload/payload-types'
import { checkRole } from '../../../payload/collections/Users/checkRole'

export const getAuthenticatedUser = async (payload: Payload): Promise<User | null> => {
  const token = cookies().get('payload-token')?.value

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
