import { PersistCategoryError } from './../../../core/errors'
import { UseCase } from '../useCase'
import { Category, ItemList } from '../../../core'
import { CategoryRepository, ItemListRepository } from '../../repositories'

interface CreateItemListCaseParams {
  itemList: ItemList
  category: Category
}

export class CreateItemListCase implements UseCase<CreateItemListCaseParams, Promise<void>> {
  constructor (
    private readonly categoryRepository: CategoryRepository,
    private readonly itemListRepository: ItemListRepository
  ) {}

  async exec ({ itemList, category }: CreateItemListCaseParams): Promise<void> {
    const updatedCategory = new Category({ ...category, lists: [...category.lists, itemList.id] })
    try {
      await this.itemListRepository.save(itemList)
      await this.categoryRepository.save(updatedCategory)
    } catch (error) {
      if (error instanceof PersistCategoryError) {
        this.itemListRepository.remove(itemList.id)
      } else {
        throw error
      }
    }
  }
}
