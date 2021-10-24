import { Id, ItemList } from '../../core'

export interface ItemListRepository {
  // find(id: Id): Promise<Category>
  findMany(ids: Id[]): Promise<ItemList[]>
  // save(category: Category): Promise<void>
  // remove(id: Id): Promise<void>
}
