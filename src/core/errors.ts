import { ItemList, Category } from './entities'

export class PersistItemListError extends Error {
  constructor (itemList: ItemList) {
    super(`Error persisting list "${itemList.name}" with ID ${itemList.id.value}`)
  }
}

export class PersistCategoryError extends Error {
  constructor (category: Category) {
    super(`Error persisting list "${category.name}" with ID ${category.id.value}`)
  }
}
