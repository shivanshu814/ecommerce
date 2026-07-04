import { formatCurrency, FREE_SHIPPING_THRESHOLD } from '../../constants/currency'

export const inclusions = [
  {
    title: 'Free Shipping',
    description: `Free shipping for orders above ${formatCurrency(FREE_SHIPPING_THRESHOLD * 100)}`,
    icon: '/assets/icons/shipping.svg',
  },
  {
    title: 'Easy Returns',
    description: 'Hassle-free 30-day returns on eligible products',
    icon: '/assets/icons/dollar.svg',
  },
  {
    title: 'Online Support',
    description: '24 hours a day, 7 days a week',
    icon: '/assets/icons/support.svg',
  },
  {
    title: 'Flexible Payment',
    description: 'Pay with UPI, cards, and net banking',
    icon: '/assets/icons/payment.svg',
  },
]

export const profileNavItems = [
  {
    title: 'Personal Information',
    url: '/account',
    icon: '/assets/icons/user.svg',
  },
  {
    title: 'My Purchases',
    url: '/account/purchases',
    icon: '/assets/icons/purchases.svg',
  },
  {
    title: 'My Orders',
    url: '/account/orders',
    icon: '/assets/icons/orders.svg',
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: '/assets/icons/logout.svg',
  },
]

export const noHeaderFooterUrls = ['/create-account', '/login', '/recover-password']
