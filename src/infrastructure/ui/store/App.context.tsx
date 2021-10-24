import { createContext, Dispatch } from 'react'
import { Action } from './App.actions'
import { State, initialState } from './App.state'

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AppContext = createContext<Context>({
  state: initialState,
  dispatch: () => { }
})
