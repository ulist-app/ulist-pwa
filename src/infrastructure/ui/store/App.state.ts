import { ItemListRepository, CategoryRepository } from '../../../application/repositories'
import { Category, ItemList, Tag } from '../../../core'
import { CategoryRepositoryImplementation, PouchDatasource } from '../../repositories'

export interface State {
  selectedCategory: Category | undefined
  selectedItemList: ItemList | undefined
  categories: Category[]
  itemLists: ItemList[]
  tags: Tag[]
  repositories: {
    categoryRepository: CategoryRepository,
    itemListRepository: ItemListRepository
  }
}

export const initialState: State = {
  selectedCategory: undefined,
  selectedItemList: undefined,
  categories: [],
  itemLists: [],
  tags: [],
  repositories: {
    categoryRepository: new CategoryRepositoryImplementation(
      new PouchDatasource('http://admin:admin@192.168.1.22:5984/categories')
    ),
    itemListRepository: {} as ItemListRepository
  }
}
