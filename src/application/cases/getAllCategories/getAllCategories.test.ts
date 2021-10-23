import { GetAllCategoriesCase } from './getAllCategories.case'
import { CategoryRepository } from '../../repositories'
import { Category } from '../../../core'

describe('Get all categories use case should', () => {
  it('return all categories', async () => {
    const categoriesMock = [new Category(), new Category()]
    const repositoryMock = {
      findAll: jest.fn(async () => categoriesMock)
    } as unknown as CategoryRepository

    const categories = await new GetAllCategoriesCase(repositoryMock).exec()

    expect(categories).toEqual(categoriesMock)
    expect(repositoryMock.findAll).toHaveBeenCalled()
  })
})
