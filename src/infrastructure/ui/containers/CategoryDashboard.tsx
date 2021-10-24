import React, { useContext, useEffect } from 'react'
import { GetAllCategoriesCase, SaveCategoryCase } from '../../../application/cases'
import { Category } from '../../../core'
import { CategoryList } from '../components'
import { ActionType, AppContext } from '../store'

export function CategoryDashboard () {
  const { state, dispatch } = useContext(AppContext)
  const getAllCategoriesCase = new GetAllCategoriesCase(state.repositories.categoryRepository)
  const saveCategoryCase = new SaveCategoryCase(state.repositories.categoryRepository)

  const fetchCategories = () => {
    getAllCategoriesCase.exec()
      .then(categories => dispatch({ type: ActionType.UPDATE_CATEGORIES, payload: categories }))
      .catch(err => console.error(err.toString()))
  }
  const createRandomCategory = () => {
    saveCategoryCase.exec(new Category())
      .then(fetchCategories)
      .catch(err => console.error(err.toString()))
  }

  useEffect(fetchCategories, [])

  return <div>
    <button onClick={createRandomCategory}>ADD CATEGORY</button>
    <CategoryList categories={state.categories} />
  </div>
}
