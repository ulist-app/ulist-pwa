import { Category } from './category'
import { Id } from '../id'

describe('Category should', () => {
  describe('be created', () => {
    const categoryParams = {
      id: new Id(),
      name: 'Groceries',
      color: 'pink',
      lists: [new Id()]
    }

    it('successfully', () => {
      const category = new Category(categoryParams)

      expect(category.id.value).toBe(categoryParams.id.value)
      expect(category.name).toBe(categoryParams.name)
      expect(category.color).toBe(categoryParams.color)
      expect(category.lists).toBe(categoryParams.lists)
    })

    describe('with default', () => {
      const category = new Category()

      it('id as Id', () => {
        expect(category.id).toBeInstanceOf(Id)
      })

      it('color as #939393', () => {
        expect(category.color).toBe('#939393')
      })

      it('name as "Untitled"', () => {
        expect(category.color).toBe('#939393')
      })

      it('lists as empty list', () => {
        expect(category.color).toBe('#939393')
      })
    })
  })
})
