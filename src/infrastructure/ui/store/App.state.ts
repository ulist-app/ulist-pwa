import { ItemListRepository } from '../../../application/repositories'
import { Category, ItemList, Tag } from '../../../core'
import { CategoryRepositoryImplementation, PouchDatasource } from '../../repositories'
import {
  CreateItemListCase,
  GetAllCategoriesCase,
  GetManyItemListsCase,
  SaveCategoryCase, SaveItemListCase
} from '../../../application/cases'

export interface State {
  selectedCategory: Category | undefined
  selectedItemList: ItemList | undefined
  categories: Category[]
  itemLists: ItemList[]
  tags: Tag[]
  useCases: {
    createItemList: CreateItemListCase,
    getAllCategories: GetAllCategoriesCase,
    getManyItems: GetManyItemListsCase,
    saveCategory: SaveCategoryCase,
    saveItemList: SaveItemListCase
  }
}

const categoryRepository = new CategoryRepositoryImplementation(
  new PouchDatasource('http://admin:admin@192.168.1.22:5984/categories')
)
const itemListRepository = {} as ItemListRepository

export const initialState: State = {
  selectedCategory: undefined,
  selectedItemList: undefined,
  categories: [],
  itemLists: [],
  tags: [],
  useCases: {
    createItemList: new CreateItemListCase(categoryRepository, itemListRepository),
    getAllCategories: new GetAllCategoriesCase(categoryRepository),
    getManyItems: new GetManyItemListsCase(itemListRepository),
    saveCategory: new SaveCategoryCase(categoryRepository),
    saveItemList: new SaveItemListCase(itemListRepository)
  }
}
