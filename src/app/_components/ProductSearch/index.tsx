'use client'

import React, { useEffect, useState } from 'react'

import { useFilter } from '../../_providers/Filter'

import classes from './index.module.scss'

export const ProductSearch: React.FC = () => {
  const { search, setSearch } = useFilter()
  const [value, setValue] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [value, setSearch])

  return (
    <div className={classes.search}>
      <label htmlFor="product-search" className={classes.label}>
        Search products
      </label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Search by product name..."
        className={classes.input}
        aria-label="Search products"
      />
    </div>
  )
}
