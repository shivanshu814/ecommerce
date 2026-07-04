import type { PayloadHandler } from 'payload/config'

import { getCartItemUnitAmount } from '../razorpay/cart'
import { verifyRazorpaySignature } from '../razorpay/verify'

type VerifyPaymentBody = {
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  total?: number
  items?: Array<{
    product: string
    quantity?: number
    price?: number
  }>
}

export const verifyRazorpayPayment: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (!user) {
    res.status(401).send('Unauthorized')
    return
  }

  const body = (req.body || {}) as VerifyPaymentBody
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, total, items } = body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: 'Missing Razorpay payment details.' })
    return
  }

  try {
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isValid) {
      res.status(400).json({ error: 'Invalid Razorpay payment signature.' })
      return
    }

    const fullUser = await payload.findByID({
      collection: 'users',
      id: user.id,
      depth: 2,
    })

    const orderItems =
      items ||
      fullUser.cart?.items?.map(item => ({
        product: typeof item.product === 'string' ? item.product : item.product?.id,
        quantity: item.quantity,
        price: getCartItemUnitAmount(item.product),
      })) ||
      []

    const order = await payload.create({
      collection: 'orders',
      data: {
        orderedBy: user.id,
        total: typeof total === 'number' ? total : 0,
        razorpayOrderID: razorpay_order_id,
        razorpayPaymentID: razorpay_payment_id,
        items: orderItems.filter(item => item.product),
      },
      req,
    })

    res.status(200).json({ doc: order })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unable to verify Razorpay payment.'
    payload.logger.error(message)
    res.status(500).json({ error: message })
  }
}
