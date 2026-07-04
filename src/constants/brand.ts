export const STORE_NAME = 'MegaMart'

export const STORE_TAGLINE = 'Everything you need, delivered fast.'

export const STORE_DESCRIPTION =
  'Shop electronics, fashion, home essentials, and more at MegaMart — your one-stop online marketplace.'

export const getStoreCopyright = (year = new Date().getFullYear()): string =>
  `© ${year} ${STORE_NAME}. All rights reserved.`
