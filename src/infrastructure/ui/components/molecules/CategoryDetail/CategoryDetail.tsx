import React from 'react'
import { CategoryDetailStyle } from './CategoryDetail.style'
import { Category } from '../../../../../core'

export function CategoryDetail ({ category }: {category: Category | undefined}) {
  if (category !== undefined) {
    return <CategoryDetailStyle>
      <span>ID: {category.id.value}</span>
      <span>{category.name}</span>
      <span>📋️ {category.lists.length} lists</span>
    </CategoryDetailStyle>
  } else {
    return <CategoryDetailStyle>
      <span>🚨 CATEGORY NOT FOUND</span>
    </CategoryDetailStyle>
  }
}
