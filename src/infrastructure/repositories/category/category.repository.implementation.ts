import { CategoryRepository } from '../../../application/repositories'
import { Category, Id } from '../../../core/entities'
import { PouchDatabase } from '../../pouchDb'

interface RawCategory extends Category {
  _id: string
}

export class CategoryRepositoryImplementation implements CategoryRepository {
  constructor (private readonly db: PouchDatabase) {}
  async findAll (): Promise<Category[]> {
    const rawCategories = await this.db.allDocs<RawCategory[]>({ include_docs: true })
    return rawCategories.rows.map(({ id, doc }) => new Category({ id: new Id(id), ...doc }))
  }
}
