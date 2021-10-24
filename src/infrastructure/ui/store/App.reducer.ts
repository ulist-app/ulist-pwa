import { Action, ActionType } from './App.actions'
import { State } from './App.state'

export function reducer (state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.payload
      }
    }
    case ActionType.SELECT_ITEM_LIST: {
      return {
        ...state,
        selectedItemList: action.payload
      }
    }
    case ActionType.UPDATE_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      }
    }
    case ActionType.UPDATE_CATEGORY_ITEM_LISTS: {
      return {
        ...state,
        itemLists: action.payload
      }
    }
    case ActionType.UPDATE_TAGS: {
      return {
        ...state,
        tags: action.payload
      }
    }
    default: {
      return state
    }
  }
}
