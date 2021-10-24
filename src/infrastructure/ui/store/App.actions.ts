import { Category, Tag, ItemList, Id } from '../../../core'

export enum ActionType {
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  SELECT_ITEM_LIST = 'SELECT_ITEM_LIST',
  UPDATE_CATEGORIES = 'UPDATE_CATEGORIES',
  UPDATE_AND_SELECT_CATEGORIES = 'UPDATE_AND_SELECT_CATEGORIES',
  UPDATE_CATEGORY_ITEM_LISTS = 'UPDATE_CATEGORY_ITEM_LISTS',
  UPDATE_TAGS = 'UPDATE_TAGS',
}

export interface BaseAction<Type, Payload> {
  type: Type
  payload: Payload
}

export type SelectCategoryAction = BaseAction<ActionType.SELECT_CATEGORY, Category>
export type SelectItemListAction = BaseAction<ActionType.SELECT_ITEM_LIST, ItemList>
export type UpdateCategoriesAction = BaseAction<ActionType.UPDATE_CATEGORIES, Category[]>
export type UpdateAndSelectCategoriesAction = BaseAction<ActionType.UPDATE_AND_SELECT_CATEGORIES,
  {categories: Category[], selectedCategoryId: Id}>
export type UpdateTagsAction = BaseAction<ActionType.UPDATE_TAGS, Tag[]>
export type UpdateCategoryItemListsAction = BaseAction<ActionType.UPDATE_CATEGORY_ITEM_LISTS, ItemList[]>

export type Action =
  | SelectCategoryAction
  | SelectItemListAction
  | UpdateCategoriesAction
  | UpdateAndSelectCategoriesAction
  | UpdateCategoryItemListsAction
  | UpdateTagsAction
