import React from 'react'

import { STORE_NAME } from '../../../constants/brand'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>{`${STORE_NAME} admin login`}</b>
        {' — sign in here to manage products, orders, and storefront content. Customers should '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>sign in on the storefront</a>
        {' to access their account, order history, and saved cart.'}
      </p>
    </div>
  )
}

export default BeforeLogin
