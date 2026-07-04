'use client'

import React, { useEffect, useState } from 'react'

import { APP_CURRENCY, APP_LOCALE, formatCurrency } from '../../../constants/currency'
import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const priceFromJSON = (priceJSON: string, quantity: number = 1, raw?: boolean): string => {
  if (!priceJSON) {
    return ''
  }

  try {
    const parsed = JSON.parse(priceJSON)?.data[0]
    const priceValue = parsed.unit_amount * quantity
    const priceType = parsed.type
    const currency = (parsed.currency || APP_CURRENCY).toUpperCase()

    if (raw) {
      return priceValue.toString()
    }

    let price = formatCurrency(priceValue, { currency, locale: APP_LOCALE })

    if (priceType === 'recurring') {
      price += `/${
        parsed.recurring.interval_count > 1
          ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
          : parsed.recurring.interval
      }`
    }

    return price
  } catch (e) {
    console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    return ''
  }
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { priceJSON } = {}, button = 'addToCart', quantity } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: priceFromJSON(priceJSON),
    withQuantity: priceFromJSON(priceJSON, quantity),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: priceFromJSON(priceJSON),
      withQuantity: priceFromJSON(priceJSON, quantity),
    })
  }, [priceJSON, quantity])

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className={classes.price}>
          <p>{price?.withQuantity}</p>
        </div>
      )}
    </div>
  )
}
