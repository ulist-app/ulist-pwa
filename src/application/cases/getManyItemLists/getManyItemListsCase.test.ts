import { ItemList } from '../../../core'
import { ItemListRepository } from '../../repositories'
import { GetManyItemListsCase } from './getManyItemListsCase'

describe('Get many item lists use case should', () => {
  describe('return all item lists by the given ids', () => {
    it('successfully', async () => {
      const itemListMock = [new ItemList(), new ItemList()]
      const ids = itemListMock.map(({ id }) => id)
      const repositoryMock = {
        findMany: jest.fn(async () => itemListMock)
      } as unknown as ItemListRepository

      const itemList = await new GetManyItemListsCase(repositoryMock).exec(ids)

      expect(itemList).toEqual(itemList)
      expect(repositoryMock.findMany).toHaveBeenCalledWith(ids)
    })
  })
  it('sorted by name', async () => {
    const itemListMock = [
      new ItemList({ name: 'Workshop' }),
      new ItemList({ name: 'Market' }),
      new ItemList({ name: 'Sport stuff' })
    ]
    const ids = itemListMock.map(({ id }) => id)
    const repositoryMock = {
      findMany: jest.fn(async () => itemListMock)
    } as unknown as ItemListRepository

    const itemList = await new GetManyItemListsCase(repositoryMock).exec(ids)

    expect(itemList).toEqual([
      itemListMock[1],
      itemListMock[2],
      itemListMock[0]
    ])
    expect(repositoryMock.findMany).toHaveBeenCalledWith(ids)
  })
})
