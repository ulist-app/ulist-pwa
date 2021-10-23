import React, { MouseEventHandler } from 'react'
import { Category, Id } from '../../../../../core'
import { CategoryListStyle } from './CategoryList.style'
import { CategoryCard } from '../../atoms'

interface CategoryListProps {
  categories: Category[],
  onClickHandler: (id: Id) => MouseEventHandler
}

export function CategoryList ({ categories, onClickHandler }: CategoryListProps) {
  return <CategoryListStyle>
    {categories.map(category =>
      <li
        key={category.id.value}
        onClick={onClickHandler(category.id)}
      >
        <CategoryCard category={category}/>
      </li>
    )}
  </CategoryListStyle>
}
