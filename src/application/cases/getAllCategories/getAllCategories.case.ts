import { UseCase } from '../useCase'
import { Category } from '../../../core/entities'
import { CategoryRepository } from '../../repositories'

export class GetAllCategoriesCase implements UseCase<undefined, Promise<Category[]>> {
  constructor (private readonly categoryRepository: CategoryRepository) {}

  exec (): Promise<Category[]> {
    return this.categoryRepository.findAll()
  }
}
