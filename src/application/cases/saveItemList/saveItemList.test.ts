import { SaveItemListCase } from './saveItemList.case'
import { ItemListRepository } from '../../repositories'
import { ItemList } from '../../../core'

describe('Save a item list use case should', () => {
  it('save the given list', async () => {
    const newItemList = new ItemList()
    const repositoryMock = {
      save: jest.fn(async () => {})
    } as unknown as ItemListRepository

    await new SaveItemListCase(repositoryMock).exec(newItemList)

    expect(repositoryMock.save).toHaveBeenCalledWith(newItemList)
  })
})
