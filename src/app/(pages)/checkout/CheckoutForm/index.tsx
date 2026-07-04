'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

import { STORE_NAME } from '../../../../constants/brand'
import { Order } from '../../../../payload/payload-types'
import { getAuthHeaders } from '../../../_utilities/authToken'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

type RazorpayHandlerResponse = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

type RazorpayCheckoutOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
  }
  theme?: {
    color?: string
  }
  handler: (response: RazorpayHandlerResponse) => void | Promise<void>
  modal?: {
    ondismiss?: () => void
  }
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      open: () => void
    }
  }
}

export const CheckoutForm: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { user, token } = useAuth()
  const { cart, cartTotal } = useCart()

  const handlePayment = useCallback(async () => {
    if (!window.Razorpay) {
      setError('Razorpay checkout failed to load. Please refresh and try again.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const orderReq = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-razorpay-order`,
        {
          method: 'POST',
          credentials: 'include',
          headers: getAuthHeaders(token),
        },
      )

      const orderRes = await orderReq.json()

      if (!orderReq.ok) {
        throw new Error(orderRes.error || 'Unable to start Razorpay checkout.')
      }

      const razorpay = new window.Razorpay({
        key: orderRes.keyId,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: STORE_NAME,
        description: 'Secure checkout powered by Razorpay',
        order_id: orderRes.orderId,
        prefill: {
          name: orderRes.customer?.name || user?.name,
          email: orderRes.customer?.email || user?.email,
        },
        theme: {
          color: '#111111',
        },
        handler: async (response: RazorpayHandlerResponse) => {
          try {
            const verifyReq = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-razorpay-payment`,
              {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(token),
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  total: cartTotal.raw,
                  items: (cart?.items || [])?.map(({ product, quantity }) => ({
                    product: typeof product === 'string' ? product : product.id,
                    quantity,
                    price:
                      typeof product === 'object'
                        ? priceFromJSON(product.priceJSON, 1, true)
                        : undefined,
                  })),
                }),
              },
            )

            if (!verifyReq.ok) {
              throw new Error((await verifyReq.json())?.error || 'Payment verification failed.')
            }

            const { doc }: { doc: Order } = await verifyReq.json()
            router.push(`/order-confirmation?order_id=${doc.id}`)
          } catch (verifyError) {
            const message =
              verifyError instanceof Error ? verifyError.message : 'Payment verification failed.'
            console.error(message) // eslint-disable-line no-console
            router.push(`/order-confirmation?error=${encodeURIComponent(message)}`)
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
          },
        },
      })

      razorpay.open()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
      setIsLoading(false)
    }
  }, [cart, cartTotal.raw, router, token, user?.email, user?.name])

  return (
    <div className={classes.form}>
      {error && <Message error={error} />}
      <p className={classes.paymentNote}>
        Pay securely with UPI, cards, net banking, and wallets through Razorpay.
      </p>
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <Button
          label={isLoading ? 'Processing...' : 'Checkout'}
          type="button"
          appearance="primary"
          disabled={isLoading}
          onClick={handlePayment}
        />
      </div>
    </div>
  )
}

export default CheckoutForm
