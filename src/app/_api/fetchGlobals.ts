import type { Footer, Header, Settings } from '../../payload/payload-types'
import { getPayloadClient } from '../../payload/payloadClient'

export async function fetchSettings(): Promise<Settings> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'settings',
    depth: 1,
  })
}

export async function fetchHeader(): Promise<Header> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'header',
    depth: 1,
  })
}

export async function fetchFooter(): Promise<Footer> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })
}

export const fetchGlobals = async (): Promise<{
  settings: Settings
  header: Header
  footer: Footer
}> => {
  const [settings, header, footer] = await Promise.all([
    fetchSettings(),
    fetchHeader(),
    fetchFooter(),
  ])

  return {
    settings,
    header,
    footer,
  }
}
