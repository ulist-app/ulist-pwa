import { Id } from '../id'
import { Tag } from './tag'

describe('Tag should', () => {
  it('be created', () => {
    const id = new Id()
    const name = 'irrelevant-name'

    const tag = new Tag(name, id)

    expect(tag.name).toBe(name)
    expect(tag.id).toBe(id)
  })
  it('be created generating an id if id is not given', () => {
    const name = 'irrelevant-name'
    const tag = new Tag(name)

    expect(tag.name).toBe(name)
    expect(tag.id).toBeInstanceOf(Id)
  })
})
