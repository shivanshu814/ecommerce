'use client'

import React, { Fragment, useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const { cart, cartIsEmpty, cartTotal } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  if (!user) {
    return null
  }

  return (
    <Fragment>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}

      {!cartIsEmpty && (
        <Fragment>
          <div className={classes.items}>
            <div className={classes.header}>
              <p>Products</p>
              <div className={classes.headerItemDetails}>
                <p></p>
                <p className={classes.quantity}>Quantity</p>
              </div>
              <p className={classes.subtotal}>Subtotal</p>
            </div>

            <ul>
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const {
                    quantity,
                    product,
                    product: { title, meta },
                  } = item

                  if (!quantity) return null

                  const metaImage = meta?.image

                  return (
                    <CheckoutItem
                      key={index}
                      product={product}
                      title={title}
                      metaImage={metaImage}
                      quantity={quantity}
                      index={index}
                    />
                  )
                }

                return null
              })}
              <div className={classes.orderTotal}>
                <p>Order Total</p>
                <p>{cartTotal.formatted}</p>
              </div>
            </ul>
          </div>

          <h3 className={classes.payment}>Payment Details</h3>
          <CheckoutForm />
        </Fragment>
      )}
    </Fragment>
  )
}
