import crypto from 'crypto'

export const verifyRazorpaySignature = ({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string
  paymentId: string
  signature: string
}): boolean => {
  const secret = process.env.RAZORPAY_KEY_SECRET

  if (!secret) {
    throw new Error('Razorpay API secret is not configured.')
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return expectedSignature === signature
}
