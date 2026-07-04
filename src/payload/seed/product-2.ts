import type { Product } from '../payload-types'

export const product2: Partial<Product> = {
  title: 'E-Book',
  slug: 'ebook',
  _status: 'published',
  meta: {
    title: 'Digital E-Book | MegaMart',
    description:
      'Instant digital download. Read on any device with lifetime access to your purchase.',
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
                  text: 'Get instant access to this digital edition after purchase. Download and read on your phone, tablet, or e-reader anytime, anywhere.',
                },
              ],
            },
            {
              children: [
                {
                  text: 'Your library is linked to your MegaMart account so you can revisit your purchase whenever you need it.',
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
  enablePaywall: true,
  paywall: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {
                  text: 'Your download is ready.',
                  bold: true,
                },
                {
                  text: ' Access the full digital edition, bonus chapters, and printable resources included with your purchase.',
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
  priceJSON:
    '{"object":"list","data":[{"id":"price_1NWAmCIsIsxtNwz9c30YMMo0","object":"price","active":true,"billing_scheme":"per_unit","created":1689913032,"currency":"inr","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_OImKj4D1xKTMzM","recurring":null,"tax_behavior":"unspecified","tiers_mode":null,"transform_quantity":null,"type":"one_time","unit_amount":248917,"unit_amount_decimal":"248917"}],"has_more":false,"url":"/v1/prices"}',
}
