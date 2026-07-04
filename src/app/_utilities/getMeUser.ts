import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../../payload/payload-types'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  user: User
  token: string
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = cookies()
  const token = cookieStore.get('payload-token')?.value || ''

  if (!token) {
    if (nullUserRedirect) {
      redirect(nullUserRedirect)
    }

    return {
      user: null as unknown as User,
      token: '',
    }
  }

  try {
    const meUserReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })

    if (!meUserReq.ok) {
      if (nullUserRedirect) {
        redirect(nullUserRedirect)
      }

      return {
        user: null as unknown as User,
        token,
      }
    }

    const contentType = meUserReq.headers.get('content-type') || ''

    if (!contentType.includes('application/json')) {
      if (nullUserRedirect) {
        redirect(nullUserRedirect)
      }

      return {
        user: null as unknown as User,
        token,
      }
    }

    const {
      user,
    }: {
      user: User
    } = await meUserReq.json()

    if (validUserRedirect && user) {
      redirect(validUserRedirect)
    }

    if (nullUserRedirect && !user) {
      redirect(nullUserRedirect)
    }

    return {
      user,
      token,
    }
  } catch {
    if (nullUserRedirect) {
      redirect(nullUserRedirect)
    }

    return {
      user: null as unknown as User,
      token,
    }
  }
}
