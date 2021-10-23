import { ItemList } from './item-list'
import { Id } from '../id'
import { Item } from '../item'

describe('Item List should', () => {
  describe('be created', () => {
    it('successfully', () => {
      const itemListParams = {
        id: new Id('irrelevant'),
        name: 'Groceries for this week',
        items: [new Item()],
        template: true
      }

      const itemList = new ItemList(itemListParams)

      expect(itemList.id).toEqual(itemListParams.id)
      expect(itemList.name).toBe(itemListParams.name)
      expect(itemList.items).toEqual(itemListParams.items)
      expect(itemList.template).toBe(itemListParams.template)
    })

    describe('with default', () => {
      const itemList = new ItemList()

      it('id as Id', () => {
        expect(itemList.id).toBeInstanceOf(Id)
      })

      it('name as "Untitled"', () => {
        expect(itemList.name).toBe('Untitled')
      })

      it('items as empty list', () => {
        expect(itemList.items).toEqual([])
      })

      it('template as false', () => {
        expect(itemList.template).toBeFalsy()
      })
    })
  })
})
