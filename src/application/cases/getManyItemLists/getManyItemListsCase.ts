import { Id, ItemList } from '../../../core'
import { UseCase } from '../useCase'
import { ItemListRepository } from '../../repositories'

export class GetManyItemListsCase implements UseCase<Id[], Promise<ItemList[]>> {
  constructor (private readonly itemListRepository: ItemListRepository) {
  }

  async exec (ids: Id[]): Promise<ItemList[]> {
    const itemLists = await this.itemListRepository.findMany(ids)
    return GetManyItemListsCase.sortByName(itemLists)
  }

  private static sortByName (itemLists: ItemList[]): ItemList[] {
    return [...itemLists].sort((a, b) => a.name > b.name
      ? 1
      : a.name < b.name
        ? -1
        : 0
    )
  }
}
