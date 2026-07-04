'use client'
import Link from 'next/link'

import { Category } from '../../../../payload/payload-types'
import { getMediaURL } from '../../../_utilities/getMediaURL'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { setCategoryFilters } = useFilter()
  const media = typeof category.media === 'object' ? category.media : null
  const imageUrl = getMediaURL(media)

  return (
    <Link
      href="/products"
      className={classes.card}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      onClick={() => setCategoryFilters([category.id])}
    >
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
