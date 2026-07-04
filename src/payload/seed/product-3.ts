import type { Product } from '../payload-types'

export const product3: Partial<Product> = {
  title: 'Online Course',
  slug: 'Online Course',
  _status: 'published',
  meta: {
    title: 'Online Course | MegaMart',
    description:
      'Self-paced online course with video lessons, exercises, and certificate of completion.',
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
                  text: 'Learn at your own pace with structured video lessons, practical exercises, and downloadable resources. Suitable for beginners and professionals looking to upskill.',
                },
              ],
            },
            {
              children: [
                {
                  text: 'Complete the course on any device and receive a certificate of completion linked to your MegaMart account.',
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
                  text: 'Course access unlocked.',
                  bold: true,
                },
                {
                  text: ' Stream all modules, download study materials, and track your progress from your account dashboard.',
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
    '{"object":"list","data":[{"id":"price_1NWAmeIsIsxtNwz9bt0Du1VT","object":"price","active":true,"billing_scheme":"per_unit","created":1689913060,"currency":"inr","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_OImLJbmlbfwzM0","recurring":null,"tax_behavior":"unspecified","tiers_mode":null,"transform_quantity":null,"type":"one_time","unit_amount":414917,"unit_amount_decimal":"414917"}],"has_more":false,"url":"/v1/prices"}',
}
