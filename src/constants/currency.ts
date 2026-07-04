export const APP_CURRENCY = 'INR'
export const APP_LOCALE = 'en-IN'
export const RAZORPAY_CURRENCY = 'INR'
export const STRIPE_CURRENCY = 'inr'
export const USD_TO_INR = 83
export const FREE_SHIPPING_THRESHOLD = 12499

export const formatCurrency = (
  amountInSmallestUnit: number,
  options?: { currency?: string; locale?: string },
): string => {
  const currency = options?.currency || APP_CURRENCY
  const locale = options?.locale || APP_LOCALE

  return (amountInSmallestUnit / 100).toLocaleString(locale, {
    style: 'currency',
    currency,
  })
}

export const convertUsdCentsToInrPaise = (usdCents: number): number =>
  Math.round(usdCents * USD_TO_INR)

export const convertPriceJSONToInr = (priceJSON: string): string => {
  try {
    const parsed = JSON.parse(priceJSON)

    if (parsed?.data?.[0]) {
      const price = parsed.data[0]

      if (price.currency?.toLowerCase() !== STRIPE_CURRENCY.toLowerCase()) {
        price.currency = STRIPE_CURRENCY
        price.unit_amount = convertUsdCentsToInrPaise(price.unit_amount)
        price.unit_amount_decimal = String(price.unit_amount)
      }
    }

    return JSON.stringify(parsed)
  } catch {
    return priceJSON
  }
}
