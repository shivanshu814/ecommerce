'use client'

import { useFormFields } from 'payload/components/forms'
import React from 'react'

export const LinkToRazorpayPayment: React.FC<{
  path: string
  label?: string
}> = props => {
  const { label, path } = props
  const { value: razorpayPaymentIDRaw } = useFormFields(([fields]) => fields[path]) || {}
  const { value: razorpayOrderIDRaw } = useFormFields(([fields]) => fields.razorpayOrderID) || {}
  const razorpayPaymentID =
    typeof razorpayPaymentIDRaw === 'string' ? razorpayPaymentIDRaw : null
  const razorpayOrderID = typeof razorpayOrderIDRaw === 'string' ? razorpayOrderIDRaw : null

  const paymentHref = razorpayPaymentID
    ? `https://dashboard.razorpay.com/app/payments/${razorpayPaymentID}`
    : null

  const orderHref = razorpayOrderID
    ? `https://dashboard.razorpay.com/app/orders/${razorpayOrderID}`
    : null

  return (
    <div>
      <p style={{ marginBottom: 4, fontWeight: 600 }}>
        {typeof label === 'string' ? label : 'Razorpay Payment ID'}
      </p>

      {Boolean(razorpayPaymentID) && paymentHref && (
        <div>
          <span style={{ fontFamily: 'monospace' }}>{razorpayPaymentID}</span>
          <br />
          <a href={paymentHref} target="_blank" rel="noopener noreferrer">
            View payment in Razorpay
          </a>
        </div>
      )}

      {Boolean(razorpayOrderID) && orderHref && (
        <div style={{ marginTop: 8 }}>
          <span style={{ fontFamily: 'monospace' }}>{razorpayOrderID}</span>
          <br />
          <a href={orderHref} target="_blank" rel="noopener noreferrer">
            View order in Razorpay
          </a>
        </div>
      )}

      {!razorpayPaymentID && !razorpayOrderID && (
        <span style={{ fontFamily: 'monospace' }}>Payment details will appear after checkout.</span>
      )}
    </div>
  )
}
