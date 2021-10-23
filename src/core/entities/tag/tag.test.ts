import { Id } from '../id'
import { Tag } from './tag'
import { palette } from '../../constants'

describe('Tag should', () => {
  describe('be created', () => {
    it('successfully', () => {
      const id = new Id()
      const name = 'irrelevant-name'
      const color = 'tomato'

      const tag = new Tag({ id, name, color })

      expect(tag.id).toEqual(id)
      expect(tag.name).toBe(name)
      expect(tag.color).toBe(color)
    })
    describe('with default', () => {
      const tag = new Tag()
      it('id as Id', () => {
        expect(tag.id).toBeInstanceOf(Id)
      })
      it('name as "Untitled"', () => {
        expect(tag.name).toBe('Untitled')
      })
      it('color as gray', () => {
        expect(tag.color).toBe(palette.gray)
      })
    })
  })
})
