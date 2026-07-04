const TOKEN_KEY = 'payload-token'

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem(TOKEN_KEY)
}

export const setAuthToken = (token: string | null): void => {
  if (typeof window === 'undefined') {
    return
  }

  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export const getAuthHeaders = (token?: string | null): Record<string, string> => {
  const authToken = token ?? getAuthToken()

  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  }
}
