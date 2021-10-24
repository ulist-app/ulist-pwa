import React from 'react'
import { AppStyle } from './App.style'
import { Route, Switch } from 'react-router-dom'
import { CategoryDashboardContainer, CategoryDetailContainer } from '../containers'

export function App () {
  return (
      <AppStyle>
        <Switch>
          <Route path="/category/:id" component={CategoryDetailContainer} />
          <Route path="/" component={CategoryDashboardContainer} />
        </Switch>
      </AppStyle>
  )
}

// TODO: Make this a PWA
// https://create-react-app.dev/docs/making-a-progressive-web-app
