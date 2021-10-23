import { GetAllCategoriesCase } from './getAllCategories.case'
import { CategoryRepository } from '../../repositories'
import { Category } from '../../../core'

describe('Get all categories use case should', () => {
  it('return all categories sorted by name', async () => {
    const categoriesMock = [new Category({ name: 'Zombie stuff' }), new Category({ name: 'Art tasks' })]
    const repositoryMock = {
      findAll: jest.fn(async () => categoriesMock)
    } as unknown as CategoryRepository

    const categories = await new GetAllCategoriesCase(repositoryMock).exec()

    expect(categories).toEqual([categoriesMock[1], categoriesMock[0]])
    expect(repositoryMock.findAll).toHaveBeenCalled()
  })
})
