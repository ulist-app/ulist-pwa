import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType, initialState, reducer } from '../store'
import { Id } from '../../../core'
import { CategoryDetail } from '../components'

export function CategoryDetailContainer () {
  const { id } = useParams<{ id: string }>()
  const [{ useCases, selectedCategory }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    useCases.getAllCategories.exec()
      .then(categories => dispatch({
        type: ActionType.UPDATE_AND_SELECT_CATEGORIES,
        payload: {
          categories,
          selectedCategoryId: new Id(id)
        }
      }))
      .catch(err => console.error(err.toString()))
  }, [dispatch, id, useCases.getAllCategories])

  return <>
    <CategoryDetail category={selectedCategory}/>
  </>
}
