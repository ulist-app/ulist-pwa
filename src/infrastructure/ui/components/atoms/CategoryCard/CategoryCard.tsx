import React from 'react'
import { Category } from '../../../../../core'
import { CategoryCardStyle } from './CategoryCard.style'

export interface CategoryCardProps {
  category: Category
}

export function CategoryCard ({ category }: CategoryCardProps) {
  return <CategoryCardStyle category={category}>
    <span className="title">{category.name}</span>
  </CategoryCardStyle>
}
