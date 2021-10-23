import React, { MouseEventHandler, useEffect, useState } from 'react'
import { AppStyle } from './App.style'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { CategoryRepositoryImplementation } from '../../repositories/category/category.repository.implementation'
import { PouchDatasource } from '../../repositories/pouchDb.datasource'
import { GetAllCategoriesCase } from '../../../application/cases/getAllCategories/getAllCategories.case'
import { Category, Id } from '../../../core'
import { SaveCategoryCase } from '../../../application/cases/saveCategory/saveCategory.case'
import { CategoryList } from '../components'

export function App () {
  const [categories, setCategories] = useState<Category[]>([])
  const categoryRepository = new CategoryRepositoryImplementation(new PouchDatasource('http://admin:admin@192.168.1.22:5984/categories'))
  const getAllCategoriesCase = new GetAllCategoriesCase(categoryRepository)
  const saveCategoryCase = new SaveCategoryCase(categoryRepository)
  const fetchCategories = () => {
    getAllCategoriesCase.exec()
      .then(setCategories)
      .catch(err => console.error(err.toString()))
  }
  const createRandomCategory = () => {
    saveCategoryCase.exec(new Category())
      .then(fetchCategories)
      .catch(err => console.error(err.toString()))
  }
  const updateRandomCategory: (id: Id) => MouseEventHandler = (id: Id) => () => {
    const category = categories.find((category) => category.id.value === id.value)
    saveCategoryCase.exec(new Category({ ...category, name: 'Groceries' }))
      .then(fetchCategories)
      .catch(err => console.error(err.toString()))
  }

  useEffect(fetchCategories, [])

  return (
    <Router>
      <AppStyle>
        <Switch>
          <Route path="/">
            <button onClick={createRandomCategory}>ADD</button>
            <CategoryList categories={categories} onClickHandler={updateRandomCategory}/>
          </Route>
        </Switch>
      </AppStyle>
    </Router>
  )
}

// TODO: Make this a PWA
// https://create-react-app.dev/docs/making-a-progressive-web-app
