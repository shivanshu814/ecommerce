import type { Page } from '../payload-types'

import { buildHomePageSeed } from './store-content'

export const home: Partial<Page> = buildHomePageSeed('{{PRODUCTS_PAGE_ID}}', '{{PRODUCT2_IMAGE}}')
