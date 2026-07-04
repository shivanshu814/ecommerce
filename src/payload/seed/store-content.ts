// @ts-nocheck
import type { Page } from '../payload-types'

import { STORE_DESCRIPTION, STORE_NAME, STORE_TAGLINE } from '../../constants/brand'

type RichTextChild = {
  text?: string
  bold?: boolean
  type?: string
  linkType?: string
  url?: string
  newTab?: boolean
  children?: RichTextChild[]
}

type RichTextBlock = {
  type?: string
  children: RichTextChild[]
}

const featureColumn = (title: string, body: string) => ({
  size: 'oneThird' as const,
  richText: [
    { children: [{ text: title }], type: 'h3' },
    { children: [{ text: body }] },
  ],
  enableLink: false,
  link: {
    reference: null,
    url: '',
    label: '',
  },
})

export const getHomeHeroRichText = (): RichTextBlock[] => [
  {
    children: [{ text: `Welcome to ${STORE_NAME}` }],
    type: 'h1',
  },
  {
    children: [
      {
        text: `${STORE_TAGLINE} Browse electronics, fashion, home essentials, groceries, and daily needs with secure checkout and reliable delivery across India.`,
      },
    ],
    type: 'large-body',
  },
]

export const getHomeLayout = (productsPageId: string, featuredMediaId?: string) => [
  {
    blockName: 'Why Shop With Us',
    blockType: 'content',
    columns: [
      {
        size: 'full',
        richText: [
          { children: [{ text: `Why shop with ${STORE_NAME}?` }], type: 'h2' },
          {
            children: [
              {
                text: 'Everything you love about online shopping — great prices, wide selection, and a checkout experience you can trust.',
              },
            ],
          },
        ],
      },
      featureColumn(
        'Free Delivery',
        'Enjoy free shipping on eligible orders above ₹12,499 with fast, tracked delivery to your doorstep.',
      ),
      featureColumn(
        'Easy Returns',
        'Changed your mind? Return most items within 30 days for a quick refund or exchange.',
      ),
      featureColumn(
        'Secure Payments',
        'Pay safely with UPI, credit and debit cards, net banking, and popular wallets through Razorpay.',
      ),
      featureColumn(
        '100% Genuine Products',
        'Shop with confidence. We work with trusted brands and verified sellers across every category.',
      ),
      featureColumn(
        'Daily Deals',
        'Save more with seasonal sales, limited-time offers, and exclusive online-only prices.',
      ),
      featureColumn(
        'Customer Support',
        'Our support team is available around the clock to help with orders, returns, and product questions.',
      ),
    ],
  },
  ...(featuredMediaId
    ? [
      {
        blockType: 'mediaBlock',
        blockName: 'Featured Collection',
        position: 'default',
        media: featuredMediaId,
      },
    ]
    : []),
  {
    blockName: 'Trending Products',
    blockType: 'archive',
    introContent: [
      {
        type: 'h4',
        children: [{ text: 'Trending now' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Explore bestsellers and new arrivals handpicked from our most popular categories.',
          },
        ],
      },
    ],
    populateBy: 'collection',
    relationTo: 'products',
    categories: [],
  },
  {
    blockType: 'cta',
    blockName: 'Shop Collection',
    richText: [
      {
        children: [{ text: 'Start shopping today' }],
        type: 'h4',
      },
      {
        children: [
          {
            text: 'Discover thousands of products across electronics, fashion, home, beauty, groceries, and more.',
          },
        ],
      },
    ],
    links: [
      {
        link: {
          type: 'reference',
          url: '',
          label: 'Browse all products',
          appearance: 'primary',
          reference: {
            value: productsPageId,
            relationTo: 'pages',
          },
        },
      },
    ],
  },
]

export const getCartHeroRichText = (): RichTextBlock[] => [
  {
    type: 'h1',
    children: [{ text: 'Your cart' }],
  },
  {
    type: 'p',
    children: [
      {
        text: 'Review your items, update quantities, and proceed to secure checkout when you are ready. Your cart is saved to your account so you can continue shopping on any device.',
      },
    ],
  },
]

export const getCartLayout = (productsPageId: string) => [
  {
    blockType: 'content',
    columns: [
      {
        size: 'twoThirds',
        link: {
          type: 'reference',
          url: '',
          reference: null,
          label: '',
        },
        richText: [
          {
            children: [
              {
                text: 'Need help with your order? Contact our customer support team for assistance with products, delivery, returns, or payment issues.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    richText: [
      {
        children: [{ text: 'Continue shopping' }],
        type: 'h4',
      },
      {
        children: [
          {
            text: 'Discover more deals across fashion, electronics, home essentials, and everyday favourites.',
          },
        ],
      },
    ],
    links: [
      {
        link: {
          type: 'reference',
          url: '',
          reference: {
            relationTo: 'pages',
            value: productsPageId,
          },
          label: 'Continue shopping',
          appearance: 'primary',
        },
      },
    ],
    blockName: 'Continue Shopping',
    blockType: 'cta',
  },
]

export const getProductsHeroRichText = (): RichTextBlock[] => [
  {
    type: 'h1',
    children: [{ text: 'Shop all products' }],
  },
  {
    type: 'p',
    children: [
      {
        text: 'Browse our full catalog of electronics, fashion, home, beauty, groceries, and more. Filter by category, compare prices, and find the right product for you.',
      },
    ],
  },
]

export const getProductsLayout = () => [
  {
    blockName: 'Product Catalog',
    blockType: 'archive',
    introContent: [
      {
        type: 'h4',
        children: [{ text: 'All products' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Shop by category or explore the full collection below. New products and seasonal favourites are added regularly.',
          },
        ],
      },
    ],
    populateBy: 'collection',
    relationTo: 'products',
    limit: 10,
    categories: [],
  },
]

export const buildHomePageSeed = (productsPageId: string, featuredMediaId?: string): Partial<Page> => ({
  title: 'Home',
  slug: 'home',
  _status: 'published',
  meta: {
    title: `${STORE_NAME} | Online Shopping`,
    description: STORE_DESCRIPTION,
    image: '{{PRODUCT1_IMAGE}}',
  },
  hero: {
    type: 'highImpact',
    richText: getHomeHeroRichText(),
    links: [
      {
        link: {
          type: 'reference',
          appearance: 'primary',
          reference: {
            relationTo: 'pages',
            value: productsPageId,
          },
          label: 'Shop now',
          url: '',
        },
      },
    ],
    media: '{{PRODUCT1_IMAGE}}',
  },
  layout: getHomeLayout(productsPageId, featuredMediaId),
})
