/* eslint-disable camelcase */

import { CategoryRepository } from '../../../application/repositories'
import { Category, Id } from '../../../core/entities'
import { PouchDatasource } from '../pouchDb.datasource'

interface RawCategory extends Category {
  _id: string
}

export class CategoryRepositoryImplementation implements CategoryRepository {
  constructor (private readonly db: PouchDatasource) {}
  async findAll (): Promise<Category[]> {
    const rawCategories = await this.db.api.allDocs<RawCategory[]>({ include_docs: true })
    return rawCategories.rows.map(({ id, doc }) => new Category({ id: new Id(id), ...doc }))
  }
}
