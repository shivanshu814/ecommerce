import type { Payload } from 'payload'

import { getStoreCopyright, STORE_NAME } from '../../constants/brand'
import { buildCartPage, buildProductsPage } from './cart-page'
import { buildHomePageSeed, getHomeHeroRichText } from './store-content'

const getRelationshipId = (value: unknown): string | undefined => {
  if (!value) return undefined
  if (typeof value === 'string') {
    if (value.includes('{{') || value.includes('}}')) return undefined
    return value
  }
  if (typeof value === 'object' && 'id' in value && typeof value.id === 'string') {
    if (value.id.includes('{{') || value.id.includes('}}')) return undefined
    return value.id
  }
  return undefined
}

const normalizeHeroLinks = (links: unknown) => {
  if (!Array.isArray(links)) return []

  return links.map(item => {
    const link = item?.link
    const reference = link?.reference

    return {
      ...item,
      link: {
        ...link,
        reference: reference
          ? {
            relationTo: reference.relationTo,
            value: getRelationshipId(reference.value),
          }
          : undefined,
      },
    }
  })
}

const updatePageBySlug = async (
  payload: Payload,
  slug: string,
  data: Record<string, unknown>,
): Promise<void> => {
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  const page = pages.docs[0]
  if (!page) return

  const existingHero = page.hero
  const mediaId = getRelationshipId(existingHero?.media)
  const metaImageId = getRelationshipId(page.meta?.image)
  const incomingMeta = (data.meta as Record<string, unknown>) || {}

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: {
      ...data,
      meta: {
        ...incomingMeta,
        ...(metaImageId ? { image: metaImageId } : {}),
      },
      hero: {
        ...(data.hero as Record<string, unknown>),
        type: existingHero?.type || (data.hero as { type?: string })?.type || 'lowImpact',
        ...(mediaId ? { media: mediaId } : {}),
        links: normalizeHeroLinks(
          (data.hero as { links?: unknown })?.links?.length
            ? (data.hero as { links?: unknown }).links
            : existingHero?.links,
        ),
      },
    },
  })
}

export const refreshStoreContent = async (payload: Payload): Promise<void> => {
  payload.logger.info(`— Refreshing storefront content for ${STORE_NAME}...`)

  const settings = await payload.findGlobal({ slug: 'settings' })
  const productsPageId = getRelationshipId(settings.productsPage)

  if (!productsPageId) {
    payload.logger.warn('Products page not found in settings. Skipping page content refresh.')
    return
  }

  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
  })

  const featuredMediaId = getRelationshipId(
    existingHome.docs[0]?.layout?.find(block => block.blockType === 'mediaBlock')?.media,
  )

  const homeData = buildHomePageSeed(productsPageId, featuredMediaId)
  const cartData = buildCartPage(productsPageId)
  const productsData = buildProductsPage()

  await updatePageBySlug(payload, 'home', {
    meta: homeData.meta,
    hero: {
      type: homeData.hero?.type,
      richText: getHomeHeroRichText(),
      links: homeData.hero?.links,
    },
    layout: homeData.layout,
  })

  await updatePageBySlug(payload, 'cart', {
    meta: cartData.meta,
    hero: {
      type: cartData.hero?.type,
      richText: cartData.hero?.richText,
      links: [],
    },
    layout: cartData.layout,
  })

  await updatePageBySlug(payload, 'products', {
    meta: productsData.meta,
    hero: {
      type: productsData.hero?.type,
      richText: productsData.hero?.richText,
    },
    layout: productsData.layout,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: getStoreCopyright(),
    },
  })

  payload.logger.info('Storefront content refresh completed.')
}

export const refreshBrand = refreshStoreContent
