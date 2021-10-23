import { SaveCategoryCase } from './saveCategory.case'
import { CategoryRepository } from '../../repositories'
import { Category } from '../../../core'

describe('Save a category use case should', () => {
  it('save the given category', async () => {
    const newCategory = new Category()
    const repositoryMock = {
      save: jest.fn(async () => {})
    } as unknown as CategoryRepository

    await new SaveCategoryCase(repositoryMock).exec(newCategory)

    expect(repositoryMock.save).toHaveBeenCalledWith(newCategory)
  })
})
