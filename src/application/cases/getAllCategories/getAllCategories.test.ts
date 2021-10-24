import { GetAllCategoriesCase } from './getAllCategories.case'
import { CategoryRepository } from '../../repositories'
import { Category } from '../../../core'

describe('Get all categories use case should', () => {
  describe('return all categories', () => {
    it('successfully', async () => {
      const categoriesMock = [new Category(), new Category()]
      const repositoryMock = {
        findAll: jest.fn(async () => categoriesMock)
      } as unknown as CategoryRepository

      const categories = await new GetAllCategoriesCase(repositoryMock).exec()

      expect(categories).toEqual(categoriesMock)
      expect(repositoryMock.findAll).toHaveBeenCalled()
    })

    it('sorted by name', async () => {
      const categoriesMock = [
        new Category({ name: 'Zombie stuff' }),
        new Category({ name: 'Art tasks' }),
        new Category({ name: 'Recipes' })
      ]
      const repositoryMock = {
        findAll: jest.fn(async () => categoriesMock)
      } as unknown as CategoryRepository

      const categories = await new GetAllCategoriesCase(repositoryMock).exec()

      expect(categories).toEqual([
        categoriesMock[1],
        categoriesMock[2],
        categoriesMock[0]
      ])
      expect(repositoryMock.findAll).toHaveBeenCalled()
    })
  })
})
