/* eslint-disable camelcase */

import { CategoryRepository } from '../../../application/repositories'
import { Category, Id } from '../../../core'
import { PouchDatasource } from '../pouchDb.datasource'

export interface RawCategory {
  _id: string
  _rev?: string
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
    const rawCategories = await this.db.api.allDocs<RawCategory>({ include_docs: true })
    return rawCategories.rows.map<Category>(
      ({ id, doc }) =>
        CategoryRepositoryImplementation.mapToDomain(id, doc)
    )
  }

  async save (category: Category): Promise<void> {
    try {
      const { _rev } = await this.db.api.get(category.id.value)
      await this.db.api.put(CategoryRepositoryImplementation.mapToDatabase(category, _rev))
    } catch (err) {
      if (PouchDatasource.isPouchDbError(err) && err?.status === 404) {
        await this.db.api.put(CategoryRepositoryImplementation.mapToDatabase(category))
      } else {
        throw err
      }
    }
  }

  private static mapToDomain (id: string, doc = {} as RawCategory): Category {
    return new Category({
      ...doc,
      id: new Id(id),
      lists: (doc.lists || []).map(id => new Id(id)),
      tags: (doc.tags || []).map(id => new Id(id))
    })
  }

  private static mapToDatabase (category: Category, revision?: string): RawCategory {
    const rawCategory = {
      ...category,
      id: category.id.value,
      _id: category.id.value,
      lists: category.lists.map(id => id.value),
      tags: category.tags.map(id => id.value)
    }
    if (revision !== undefined) {
      return {
        ...rawCategory,
        _rev: revision
      }
    } else {
      return rawCategory
    }
  }
}
