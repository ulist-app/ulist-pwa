import { UseCase } from '../useCase'
import { Category } from '../../../core'
import { CategoryRepository } from '../../repositories'

export class GetAllCategoriesCase implements UseCase<undefined, Promise<Category[]>> {
  constructor (private readonly categoryRepository: CategoryRepository) {}

  async exec (): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll()
    return GetAllCategoriesCase.sortByName(categories)
  }

  private static sortByName (categories: Category[]): Category[] {
    return [...categories].sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }

      if (a.name < b.name) {
        return -1
      }

      return 0
    })
  }
}
