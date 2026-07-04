// @ts-nocheck
import type { PayloadHandler } from 'payload/config'

import { RAZORPAY_CURRENCY } from '../../constants/currency'
import { getCartTotalFromItems } from '../razorpay/cart'
import { getRazorpayClient, getRazorpayKeyId } from '../razorpay/client'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error !== null && 'error' in error) {
    const razorpayError = (error as { error?: { description?: string; reason?: string } }).error

    if (razorpayError?.description) {
      return razorpayError.description
    }
  }

  return 'Unable to create Razorpay order.'
}

const buildReceipt = (userId: string): string => {
  const receipt = `rcpt_${userId.slice(-8)}_${Date.now().toString(36)}`

  return receipt.slice(0, 40)
}

export const createRazorpayOrder: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (!user) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    const fullUser = await payload.findByID({
      collection: 'users',
      id: user.id,
    })

    if (!fullUser) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const cartItems = fullUser.cart?.items

    if (!cartItems?.length) {
      res.status(400).json({ error: 'No items in cart' })
      return
    }

    const amount = getCartTotalFromItems(cartItems)

    if (amount < 100) {
      res.status(400).json({ error: 'Order total must be at least ₹1.' })
      return
    }

    const razorpay = getRazorpayClient()
    const order = await razorpay.orders.create({
      amount,
      currency: RAZORPAY_CURRENCY,
      receipt: buildReceipt(user.id),
      notes: {
        userId: user.id,
        email: fullUser.email || '',
      },
    })

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: getRazorpayKeyId(),
      customer: {
        name: fullUser.name || fullUser.email,
        email: fullUser.email,
      },
    })
  } catch (error: unknown) {
    const message = getErrorMessage(error)
    payload.logger.error(`Razorpay order creation failed: ${message}`)
    res.status(500).json({ error: message })
  }
}
