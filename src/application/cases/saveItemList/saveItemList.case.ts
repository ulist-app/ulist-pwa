import { UseCase } from '../useCase'
import { ItemList } from '../../../core'
import { ItemListRepository } from '../../repositories'

export class SaveItemListCase implements UseCase<ItemList, Promise<void>> {
  constructor (private readonly itemListRepository: ItemListRepository) {}

  async exec (itemList: ItemList): Promise<void> {
    await this.itemListRepository.save(itemList)
  }
}
