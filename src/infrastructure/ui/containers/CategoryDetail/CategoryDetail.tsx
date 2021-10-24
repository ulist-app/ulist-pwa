import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GetAllCategoriesCase } from '../../../../application/cases'
import { ActionType, AppContext } from '../../store'
import { CategoryDetailStyle } from './CategoryDetail.style'

export function CategoryDetail () {
  const { id } = useParams<{ id: string }>()
  const { state, dispatch } = useContext(AppContext)
  const getAllCategoriesCase = new GetAllCategoriesCase(state.repositories.categoryRepository)
  const category = state.categories.find((category) => category.id.value === id)

  const fetchCategories = () => {
    getAllCategoriesCase.exec()
      .then(categories => dispatch({ type: ActionType.UPDATE_CATEGORIES, payload: categories }))
      .catch(err => console.error(err.toString()))
  }

  useEffect(fetchCategories, [])

  if (category !== undefined) {
    return <CategoryDetailStyle>
      <span>ID: {id}</span>
      <span>{category.name}</span>
      <span>{category.lists.length} lists</span>
    </CategoryDetailStyle>
  } else {
    return <CategoryDetailStyle>
      <span>ID: {id}</span>
      <span>🚨 CATEGORY NOT FOUND</span>
    </CategoryDetailStyle>
  }
}
