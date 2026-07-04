// @ts-nocheck
import type { Product } from '../payload-types'

export const product1: Partial<Product> = {
  title: 'Cotton T-Shirt',
  slug: 'cotton-t',
  _status: 'published',
  meta: {
    title: 'Premium Cotton T-Shirt | MegaMart',
    description:
      'Soft, breathable cotton tee with a classic fit. Perfect for everyday wear. Available in multiple sizes.',
    image: '{{PRODUCT_IMAGE}}',
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {
                  text: 'Crafted from 100% premium cotton for all-day comfort. This wardrobe essential features a relaxed fit, reinforced stitching, and fabric that stays soft wash after wash.',
                },
              ],
            },
            {
              children: [
                {
                  text: 'Pair it with jeans for casual outings or layer it under a jacket for a smart-casual look. Machine washable and designed to hold its shape.',
                },
              ],
            },
          ],
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  relatedProducts: [],
}
