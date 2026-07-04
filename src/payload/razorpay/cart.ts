import type { CartItems } from '../payload-types'
import { APP_CURRENCY } from '../../constants/currency'

export const getCartItemUnitAmount = (product: CartItems[0]['product']): number => {
  if (typeof product !== 'object' || !product?.priceJSON) {
    return 0
  }

  try {
    return JSON.parse(product.priceJSON)?.data?.[0]?.unit_amount || 0
  } catch {
    return 0
  }
}

export const getCartTotalFromItems = (items: CartItems | null | undefined): number => {
  if (!items?.length) {
    return 0
  }

  return items.reduce((total, item) => {
    const unitAmount = getCartItemUnitAmount(item.product)
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0

    return total + unitAmount * quantity
  }, 0)
}

export const getOrderCurrency = (): string => APP_CURRENCY
