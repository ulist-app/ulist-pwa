import { CategoryRepositoryImplementation } from './category.repository.implementation'
import { PouchDatasource } from '../pouchDb.datasource'

describe('Category repository', () => {
  describe('return all categories', () => {
    it('successfully', async () => {
      const rawCategories = [
        { id: 'irrelevant', name: 'Stuff to do', lists: ['id', 'id2'], color: 'red' },
        { id: 'irrelevant-2', name: 'Groceries', lists: ['id3', 'id4'], color: 'blue' }
      ]
      const databaseMock = {
        api: {
          allDocs: jest.fn(async () => ({
            offset: 0,
            total_rows: 2,
            rows: rawCategories.map(({ id, ...doc }) => ({ id, doc }))
          }))
        }
      } as unknown as PouchDatasource

      const categories = await new CategoryRepositoryImplementation(databaseMock).findAll()

      expect(databaseMock.api.allDocs).toHaveBeenCalled()
      expect(categories).toHaveLength(2)
      expect(categories[0].id.value).toBe(rawCategories[0].id)
      expect(categories[0].name).toBe(rawCategories[0].name)
      expect(categories[0].lists).toEqual(rawCategories[0].lists)
      expect(categories[0].color).toEqual(rawCategories[0].color)
      expect(categories[1].id.value).toBe(rawCategories[1].id)
      expect(categories[1].name).toBe(rawCategories[1].name)
      expect(categories[1].lists).toEqual(rawCategories[1].lists)
      expect(categories[1].color).toEqual(rawCategories[1].color)
    })
  })
})
