import React, { useEffect, useReducer } from 'react'
import { Category } from '../../../core'
import { CategoryDashboard } from '../components'
import { ActionType, initialState, reducer } from '../store'

export function CategoryDashboardContainer () {
  const [{ categories, useCases }, dispatch] = useReducer(reducer, initialState)

  const fetchCategories = () => {
    useCases.getAllCategories.exec()
      .then(categories => dispatch({ type: ActionType.UPDATE_CATEGORIES, payload: categories }))
      .catch(err => console.error(err.toString()))
  }
  const saveCategory = (category: Category) => {
    useCases.saveCategory.exec(category)
      .then(fetchCategories)
      .catch(err => console.error(err.toString()))
  }

  useEffect(fetchCategories, [dispatch, useCases.getAllCategories])

  return <div>
    <CategoryDashboard
      categories={categories}
      saveCategoryHandler={saveCategory}
    />
  </div>
}
