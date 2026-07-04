const policies = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://checkout.razorpay.com',
    'https://maps.googleapis.com',
  ],
  'child-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': [
    "'self'",
    'https://*.razorpay.com',
    'https://raw.githubusercontent.com',
    'https://picsum.photos',
    'https://images.unsplash.com',
  ],
  'font-src': ["'self'"],
  'frame-src': ["'self'", 'https://checkout.razorpay.com', 'https://api.razorpay.com'],
  'connect-src': [
    "'self'",
    'https://checkout.razorpay.com',
    'https://api.razorpay.com',
    'https://maps.googleapis.com',
  ],
}

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
