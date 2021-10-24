import React from 'react'
import { Category } from '../../../../../core'
import { CategoryListStyle } from './CategoryList.style'
import { CategoryCard } from '../../atoms'
import { Link } from 'react-router-dom'

interface CategoryListProps {
  categories: Category[],
}

export function CategoryList ({ categories }: CategoryListProps) {
  return <CategoryListStyle>
    {categories.map(category =>
      <Link
        to={`/category/${category.id.value}`}
        key={category.id.value}
      >
        <li>
          <CategoryCard category={category}/>
        </li>
      </Link>

    )}
  </CategoryListStyle>
}
