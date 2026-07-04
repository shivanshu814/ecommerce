'use client'

import React from 'react'
import { Link } from 'react-router-dom'

import { SeedButton } from './SeedButton'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <div className={`${baseClass}__banner`}>
        <h4>{`MegaMart store dashboard`}</h4>
      </div>
      Quick actions for your store:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <Link to="/admin/collections/products">Manage products</Link>
          {' — add listings, update prices, and publish new arrivals.'}
        </li>
        <li>
          <Link to="/admin/collections/orders">View orders</Link>
          {' — track payments, fulfillment, and customer purchases.'}
        </li>
        <li>
          <Link to="/admin/collections/pages">Edit storefront pages</Link>
          {' — update the home page, cart page, and promotional content.'}
        </li>
        <li>
          {'Configure '}
          <a
            href="https://dashboard.razorpay.com/app/keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            Razorpay API keys
          </a>
          {' in your environment variables to enable live checkout.'}
        </li>
        <li>
          <SeedButton />
          {' to populate demo catalog data if you are setting up a fresh store.'}
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            View storefront
          </a>
          {' to preview the customer shopping experience.'}
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
