/* eslint-disable camelcase */

import { CategoryRepository } from '../../../application/repositories'
import { Category, Id } from '../../../core/entities'
import { PouchDatasource } from '../pouchDb.datasource'

interface RawCategory {
  _id: string
  id: string
  name: string
  color: string
  lists: string[]
  tags: string[]
}

export class CategoryRepositoryImplementation implements CategoryRepository {
  constructor (private readonly db: PouchDatasource) {
  }

  async findAll (): Promise<Category[]> {
    const rawCategories = await this.db.api.allDocs<RawCategory[]>({ include_docs: true })
    return rawCategories.rows.map(({ id, doc }) => new Category({ ...doc, id: new Id(id) }))
  }

  async save (category: Category): Promise<void> {
    try {
      const storedCategory = await this.db.api.get(category.id.value)
      await this.db.api.put({
        ...CategoryRepositoryImplementation.mapToDatabase(category),
        _rev: storedCategory._rev
      })
    } catch (err) {
      if (this.db.isPouchDbError(err) && err?.status === 404) {
        await this.db.api.put(CategoryRepositoryImplementation.mapToDatabase(category))
      } else {
        throw err
      }
    }
  }

  private static mapToDatabase (category: Category): RawCategory {
    return {
      ...category,
      id: category.id.value,
      _id: category.id.value,
      lists: category.lists.map(id => id.value),
      tags: category.tags.map(id => id.value)
    }
  }
}
