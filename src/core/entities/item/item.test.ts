import { Item } from './item'
import { Id } from '../id'
import { Tag } from '../tag'

describe('Item should', () => {
  const itemParams = {
    id: new Id(),
    name: 'irrelevant-name',
    tags: [new Tag({ name: 'veggies' })],
    checked: true,
    quantity: 2
  }

  describe('be created', () => {
    it('successfully', () => {
      const item = new Item(itemParams)

      expect(item.id).toEqual(itemParams.id)
      expect(item.name).toEqual(itemParams.name)
      expect(item.tags).toEqual(itemParams.tags)
      expect(item.checked).toEqual(itemParams.checked)
      expect(item.quantity).toEqual(itemParams.quantity)
    })

    describe('with default', () => {
      const item = new Item()

      it('id as Id', () => {
        expect(item.id).toBeInstanceOf(Id)
      })

      it('name as "Untitled"', () => {
        expect(item.name).toBe('Untitled')
      })

      it('checked as false', () => {
        expect(item.checked).toBeFalsy()
      })

      it('quantity as 1', () => {
        expect(item.quantity).toBe(1)
      })

      it('tags as an empty list', () => {
        expect(item.tags).toEqual([])
      })
    })
  })
})
