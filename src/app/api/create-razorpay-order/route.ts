import { NextRequest, NextResponse } from 'next/server'

import { RAZORPAY_CURRENCY } from '../../../constants/currency'
import { getCartTotalFromItems } from '../../../payload/razorpay/cart'
import { getRazorpayClient, getRazorpayKeyId } from '../../../payload/razorpay/client'
import { getPayloadClient } from '../../../payload/payloadClient'
import { getAuthenticatedUser } from '../_utilities/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const buildReceipt = (userId: string): string => {
  const receipt = `rcpt_${userId.slice(-8)}_${Date.now().toString(36)}`
  return receipt.slice(0, 40)
}

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

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const authUser = await getAuthenticatedUser(payload, req)

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fullUser = await payload.findByID({
      collection: 'users',
      id: authUser.id,
      depth: 2,
      overrideAccess: true,
    })

    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const cartItems = fullUser.cart?.items

    if (!cartItems?.length) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const amount = getCartTotalFromItems(cartItems)

    if (amount < 100) {
      return NextResponse.json({ error: 'Order total must be at least ₹1.' }, { status: 400 })
    }

    const razorpay = getRazorpayClient()
    const order = await razorpay.orders.create({
      amount,
      currency: RAZORPAY_CURRENCY,
      receipt: buildReceipt(authUser.id),
      notes: {
        userId: authUser.id,
        email: fullUser.email || '',
      },
    })

    return NextResponse.json({
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
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
