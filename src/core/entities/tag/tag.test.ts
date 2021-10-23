import { Id } from '../id'
import { Tag } from './tag'

describe('Tag should', () => {
  describe('be created', () => {
    it('successfully', () => {
      const id = new Id()
      const name = 'irrelevant-name'

      const tag = new Tag({ id, name })

      expect(tag.name).toBe(name)
      expect(tag.id).toBe(id)
    })
    describe('with default', () => {
      const tag = new Tag()
      it('id as Id', () => {
        expect(tag.id).toBeInstanceOf(Id)
      })
      it('name as "Untitled"', () => {
        expect(tag.name).toBe('Untitled')
      })
    })
  })
})
