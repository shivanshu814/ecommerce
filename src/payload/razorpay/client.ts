import Razorpay from 'razorpay'

let razorpayClient: Razorpay | null = null

export const getRazorpayClient = (): Razorpay => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys are not configured.')
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })
  }

  return razorpayClient
}

export const getRazorpayKeyId = (): string => {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  if (!keyId) {
    throw new Error('Razorpay key ID is not configured.')
  }

  return keyId
}
