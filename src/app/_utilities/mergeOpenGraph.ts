import type { Metadata } from 'next'

import { STORE_DESCRIPTION, STORE_NAME } from '../../constants/brand'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: STORE_NAME,
  title: `${STORE_NAME} | Online Shopping`,
  description: STORE_DESCRIPTION,
  images: [
    {
      url: '/logo-black.svg',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
