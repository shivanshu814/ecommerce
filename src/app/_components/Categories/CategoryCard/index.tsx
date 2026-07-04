'use client'
import Link from 'next/link'

import { Category } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { setCategoryFilters } = useFilter()
  const media = typeof category.media === 'object' ? category.media : null

  return (
    <Link
      href="/products"
      className={classes.card}
      style={media?.url ? { backgroundImage: `url(${media.url})` } : undefined}
      onClick={() => setCategoryFilters([category.id])}
    >
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
