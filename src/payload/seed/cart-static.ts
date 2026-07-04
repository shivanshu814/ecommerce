// @ts-nocheck
import type { Page } from '../payload-types'

import { STORE_NAME } from '../../constants/brand'

export const staticCart: Page = {
  id: '',
  title: 'Cart',
  slug: 'cart',
  createdAt: '',
  updatedAt: '',
  _status: 'published',
  meta: {
    title: `Your Cart | ${STORE_NAME}`,
    description: 'Review your items and proceed to secure checkout.',
  },
  hero: {
    type: 'lowImpact',
    links: [],
    media: '',
    richText: [
      {
        type: 'h1',
        children: [{ text: 'Your cart' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Your cart is empty. Sign in to save items across devices, or continue shopping to add products.',
          },
        ],
      },
    ],
  },
  layout: [],
}
