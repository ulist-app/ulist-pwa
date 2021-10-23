import { Category } from './category'
import { Id } from '../id'
import { palette } from '../../constants'

describe('Category should', () => {
  describe('be created', () => {
    const categoryParams = {
      id: new Id(),
      name: 'Groceries',
      color: 'pink',
      lists: [new Id()],
      tags: [new Id()]
    }

    it('successfully', () => {
      const category = new Category(categoryParams)

      expect(category.id.value).toBe(categoryParams.id.value)
      expect(category.name).toBe(categoryParams.name)
      expect(category.color).toBe(categoryParams.color)
      expect(category.lists).toEqual(categoryParams.lists)
      expect(category.tags).toEqual(categoryParams.tags)
    })

    describe('with default', () => {
      const category = new Category()

      it('id as Id', () => {
        expect(category.id).toBeInstanceOf(Id)
      })

      it('color as gray', () => {
        expect(category.color).toBe(palette.gray)
      })

      it('name as "Untitled"', () => {
        expect(category.name).toBe('Untitled')
      })

      it('lists as empty list', () => {
        expect(category.lists).toEqual([])
      })

      it('tags as empty list', () => {
        expect(category.tags).toEqual([])
      })
    })
  })
})
