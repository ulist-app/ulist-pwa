import { ItemListRepository } from './../../repositories/item-list.repository'
import { CategoryRepository } from '../../repositories'
import { Category, ItemList } from '../../../core'
import { CreateItemListCase } from './createItemList.case'
import { PersistCategoryError, PersistItemListError } from '../../../core/errors'

describe('Create item list use case should', () => {
  it('create an item list with an item with default values', async () => {
    const category = new Category()
    const itemList = new ItemList()
    const categoryRepositoryMock = {
      save: jest.fn(async () => {})
    } as unknown as CategoryRepository
    const itemListRepositoryMock = {
      save: jest.fn(async () => {})
    } as unknown as ItemListRepository

    await new CreateItemListCase(categoryRepositoryMock, itemListRepositoryMock).exec({
      category,
      itemList
    })

    expect(categoryRepositoryMock.save).toHaveBeenCalledWith(new Category({
      ...category,
      lists: [...category.lists, itemList.id]
    }))
    expect(itemListRepositoryMock.save).toHaveBeenCalledWith(itemList)
  })

  it('rollback if category update fails', async () => {
    const category = new Category()
    const itemList = new ItemList()
    const categoryRepositoryMock = {
      save: jest.fn(async () => { throw new PersistCategoryError(category) })
    } as unknown as CategoryRepository
    const itemListRepositoryMock = {
      save: jest.fn(async () => {}),
      remove: jest.fn(async () => {})
    } as unknown as ItemListRepository

    await new CreateItemListCase(categoryRepositoryMock, itemListRepositoryMock).exec({
      category,
      itemList
    })

    expect(categoryRepositoryMock.save).toHaveBeenCalledWith(new Category({
      ...category,
      lists: [...category.lists, itemList.id]
    }))
    expect(itemListRepositoryMock.save).toHaveBeenCalledWith(itemList)
    expect(itemListRepositoryMock.remove).toHaveBeenCalledWith(itemList.id)
  })

  it('throw an error if item list persistance fails', async () => {
    const category = new Category()
    const itemList = new ItemList()
    const expectedError = new PersistItemListError(itemList)
    const categoryRepositoryMock = {
      save: jest.fn(async () => { })
    } as unknown as CategoryRepository
    const itemListRepositoryMock = {
      save: jest.fn(async () => { throw expectedError })
    } as unknown as ItemListRepository

    await expect(() => new CreateItemListCase(categoryRepositoryMock, itemListRepositoryMock).exec({
      category,
      itemList
    })).rejects.toThrow(expectedError)
  })
})
