import type { Page } from '../payload-types'

import { STORE_DESCRIPTION, STORE_NAME, STORE_TAGLINE } from '../../constants/brand'

export const staticHome: Page = {
  id: '',
  title: 'Home',
  slug: 'home',
  createdAt: '',
  updatedAt: '',
  meta: {
    title: `${STORE_NAME} | Online Shopping`,
    description: STORE_DESCRIPTION,
  },
  hero: {
    type: 'lowImpact',
    richText: [
      {
        children: [{ text: `Welcome to ${STORE_NAME}` }],
        type: 'h1',
      },
      {
        children: [
          {
            text: `${STORE_TAGLINE} Our storefront is being updated with the latest products and offers. Please check back soon.`,
          },
        ],
      },
    ],
    media: '',
  },
  layout: [
    {
      richText: [
        {
          children: [{ text: 'Shop the latest deals' }],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'Browse electronics, fashion, home essentials, and everyday favourites once the catalog is live.',
            },
          ],
        },
      ],
      links: [],
      blockName: 'Coming Soon',
      blockType: 'cta',
    },
  ],
}
