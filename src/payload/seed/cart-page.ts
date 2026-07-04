import type { Page } from '../payload-types'

import { STORE_DESCRIPTION, STORE_NAME } from '../../constants/brand'
import { getCartHeroRichText, getCartLayout, getProductsHeroRichText, getProductsLayout } from './store-content'

export const buildCartPage = (productsPageId: string): Partial<Page> => ({
  title: 'Cart',
  slug: 'cart',
  _status: 'published',
  meta: {
    title: `Your Cart | ${STORE_NAME}`,
    description: 'Review your items and proceed to secure checkout.',
  },
  hero: {
    type: 'lowImpact',
    links: [],
    media: '',
    richText: getCartHeroRichText(),
  },
  layout: getCartLayout(productsPageId),
})

export const buildProductsPage = (): Omit<Page, 'updatedAt' | 'createdAt' | 'id'> => ({
  title: 'Products',
  slug: 'products',
  _status: 'published',
  meta: {
    title: `Shop All Products | ${STORE_NAME}`,
    description: STORE_DESCRIPTION,
  },
  hero: {
    type: 'lowImpact',
    media: null,
    richText: getProductsHeroRichText(),
  },
  layout: getProductsLayout(),
})

// Backward-compatible exports used during initial seeding.
export const cartPage: Partial<Page> = buildCartPage('{{PRODUCTS_PAGE_ID}}')
export const productsPage = buildProductsPage()
