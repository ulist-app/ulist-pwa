import { UseCase } from '../useCase'
import { Category } from '../../../core'
import { CategoryRepository } from '../../repositories'

export class SaveCategoryCase implements UseCase<Category, Promise<void>> {
  constructor (private readonly categoryRepository: CategoryRepository) {}

  async exec (category: Category): Promise<void> {
    await this.categoryRepository.save(category)
  }
}
