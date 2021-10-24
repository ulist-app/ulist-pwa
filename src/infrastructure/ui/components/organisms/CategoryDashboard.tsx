import React, { MouseEventHandler } from 'react'
import { CategoryList } from '../molecules'
import { Category } from '../../../../core'

interface CategoryDashboardProps {
  categories: Category[]
  saveCategoryHandler: (category: Category) => void
}

export function CategoryDashboard ({ categories, saveCategoryHandler }: CategoryDashboardProps) {
  const onClickHandler: MouseEventHandler = () => saveCategoryHandler(new Category())
  return <>
    <button onClick={onClickHandler}>ADD CATEGORY</button>
    <CategoryList categories={categories}/>
  </>
}
