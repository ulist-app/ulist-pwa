import { Category } from '../../core/entities'

export interface CategoryRepository {
  // find(id: Id): Promise<Category>
  findAll(): Promise<Category[]>
  // save(category: Category): Promise<void>
  // remove(id: Id): Promise<void>
}
