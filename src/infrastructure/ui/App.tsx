import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { CategoryRepositoryImplementation } from '../repositories/category/category.repository.implementation'
import { PouchDatasource } from '../repositories/pouchDb.datasource'
import { GetAllCategoriesCase } from '../../application/cases/getAllCategories/getAllCategories.case'
import { Category } from '../../core/entities'

function App () {
  const [categories, setCategories] = useState<Category[]>([])
  const categoryRepository = new CategoryRepositoryImplementation(new PouchDatasource('http://admin:admin@192.168.1.22:5984/categories'))
  const getAllCategoriesCase = new GetAllCategoriesCase(categoryRepository)

  useEffect(() => {
    getAllCategoriesCase.exec()
      .then(setCategories)
      .catch(err => console.error(err.toString()))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <pre><code>{JSON.stringify(categories, null, 2)}</code></pre>
      </header>
    </div>
  )
}

// TODO: Make this a PWA
// https://create-react-app.dev/docs/making-a-progressive-web-app

export default App
