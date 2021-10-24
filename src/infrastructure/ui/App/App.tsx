import React, { useReducer } from 'react'
import { AppStyle } from './App.style'
import { Route, Switch } from 'react-router-dom'
import { reducer, AppContext, initialState } from '../store'
import { CategoryDashboard, CategoryDetail } from '../containers'

export function App () {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppStyle>
        <Switch>
          <Route path="/category/:id">
            <CategoryDetail />
          </Route>
          <Route path="/">
            <CategoryDashboard />
          </Route>
        </Switch>
      </AppStyle>
    </AppContext.Provider>
  )
}

// TODO: Make this a PWA
// https://create-react-app.dev/docs/making-a-progressive-web-app
