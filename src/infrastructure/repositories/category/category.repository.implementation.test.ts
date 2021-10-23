import { CategoryRepositoryImplementation, RawCategory } from './category.repository.implementation'
import { PouchDatasource } from '../pouchDb.datasource'
import { Category } from '../../../core'

interface mockParams {
  allDocs?: Partial<RawCategory>[]
  get?: (id: string) => Promise<{_rev: string}>
  put?: (data: RawCategory) => Promise<void>
}

function mockDatabase ({
  allDocs = [],
  get = jest.fn(),
  put = jest.fn()
}: mockParams = {}): PouchDatasource {
  return {
    api: {
      allDocs: jest.fn(async () => ({
        offset: 0,
        total_rows: 2,
        rows: allDocs.map(({ id, ...doc }) => ({ id, doc }))
      })),
      get,
      put
    }
  } as unknown as PouchDatasource
}

describe('Category repository should', () => {
  describe('fetch all categories', () => {
    it('successfully', async () => {
      const rawCategories = [
        { id: 'irrelevant', name: 'Stuff to do', lists: ['id', 'id2'], color: 'red', tags: ['id41'] }
      ]
      const databaseMock = mockDatabase({ allDocs: rawCategories })

      const categories = await new CategoryRepositoryImplementation(databaseMock).findAll()

      expect(databaseMock.api.allDocs).toHaveBeenCalled()
      expect(categories).toHaveLength(1)
      expect(categories[0].id.value).toBe(rawCategories[0].id)
      expect(categories[0].name).toBe(rawCategories[0].name)
      expect(categories[0].lists[0].value).toEqual(rawCategories[0].lists[0])
      expect(categories[0].lists[1].value).toEqual(rawCategories[0].lists[1])
      expect(categories[0].color).toEqual(rawCategories[0].color)
      expect(categories[0].tags[0].value).toEqual(rawCategories[0].tags[0])
    })

    it('with list as empty list if no list was found for the category', async () => {
      const rawCategories = [
        { id: 'irrelevant', name: 'Stuff to do', color: 'red', tags: ['id41'] }
      ]
      const databaseMock = mockDatabase({ allDocs: rawCategories })

      const categories = await new CategoryRepositoryImplementation(databaseMock).findAll()

      expect(databaseMock.api.allDocs).toHaveBeenCalled()
      expect(categories).toHaveLength(1)
      expect(categories[0].lists).toEqual([])
    })

    it('with list as empty list if no list was found for the category', async () => {
      const rawCategories = [
        { id: 'irrelevant', name: 'Stuff to do', color: 'red', lists: ['id', 'id2'] }
      ]
      const databaseMock = mockDatabase({ allDocs: rawCategories })

      const categories = await new CategoryRepositoryImplementation(databaseMock).findAll()

      expect(databaseMock.api.allDocs).toHaveBeenCalled()
      expect(categories).toHaveLength(1)
      expect(categories[0].tags).toEqual([])
    })
  })
  describe('save', () => {
    it('an already existing category', async () => {
      const category = new Category()
      const revision = 'irrelevant-hash'
      const databaseMock = mockDatabase({
        get: jest.fn(async () => ({ _rev: revision }))
      })

      await new CategoryRepositoryImplementation(databaseMock).save(category)

      expect(databaseMock.api.get).toHaveBeenCalledWith(category.id.value)
      expect(databaseMock.api.put).toHaveBeenCalledWith({
        id: category.id.value,
        _id: category.id.value,
        _rev: revision,
        lists: category.lists.map(id => id.value),
        tags: category.tags.map(id => id.value),
        name: category.name,
        color: category.color
      })
    })

    it('a brand new category', async () => {
      const category = new Category()
      const databaseMock = mockDatabase({
        get: jest.fn(async () => {
          // eslint-disable-next-line no-throw-literal
          throw { status: 404 }
        })
      })

      await new CategoryRepositoryImplementation(databaseMock).save(category)

      expect(databaseMock.api.get).toHaveBeenCalledWith(category.id.value)
      expect(databaseMock.api.put).toHaveBeenCalledWith({
        id: category.id.value,
        _id: category.id.value,
        lists: category.lists.map(id => id.value),
        tags: category.tags.map(id => id.value),
        name: category.name,
        color: category.color
      })
    })

    it('throw unexpected error', async () => {
      const category = new Category()
      const unexpectedError = new Error('💥 Boom!!')
      const databaseMock = mockDatabase({
        async get () {
          throw unexpectedError
        }
      })

      await expect(() => new CategoryRepositoryImplementation(databaseMock).save(category))
        .rejects.toThrow(unexpectedError)
    })
  })
})
