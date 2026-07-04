import { NextRequest, NextResponse } from 'next/server'

import { getCartItemUnitAmount } from '../../../payload/razorpay/cart'
import { verifyRazorpaySignature } from '../../../payload/razorpay/verify'
import { getPayloadClient } from '../../../payload/payloadClient'
import { getAuthenticatedUser } from '../_utilities/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

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

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await req.json()) as VerifyPaymentBody
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, total, items } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing Razorpay payment details.' }, { status: 400 })
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid Razorpay payment signature.' }, { status: 400 })
    }

    const fullUser = await payload.findByID({
      collection: 'users',
      id: authUser.id,
      depth: 2,
      overrideAccess: true,
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
        orderedBy: authUser.id,
        total: typeof total === 'number' ? total : 0,
        razorpayOrderID: razorpay_order_id,
        razorpayPaymentID: razorpay_payment_id,
        items: orderItems.filter(item => Boolean(item.product)) as typeof orderItems,
      },
      user: authUser,
      overrideAccess: false,
    })

    return NextResponse.json({ doc: order })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unable to verify Razorpay payment.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
