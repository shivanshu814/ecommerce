import type { Media } from '../../payload/payload-types'

export const getMediaURL = (resource?: Media | string | null): string | undefined => {
  if (!resource || typeof resource === 'string') {
    return undefined
  }

  if (resource.cdnUrl?.startsWith('http')) {
    return resource.cdnUrl
  }

  if (resource.url?.startsWith('http')) {
    return resource.url
  }

  if (resource.filename) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${resource.filename}`
  }

  if (resource.url) {
    return resource.url.startsWith('/')
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}${resource.url}`
      : resource.url
  }

  return undefined
}
