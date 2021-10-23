import { TagList } from './tag-list'
import { Tag } from '../tag'

describe('Tag list should', () => {
  it('be created with an empty tag list as default', () => {
    const tagList = new TagList()

    expect(tagList.values).toHaveLength(0)
  })

  it('return a list of tags', () => {
    const tags = [
      new Tag('veggies'),
      new Tag('drinks')
    ]
    const tagList = new TagList(tags)

    const tagsFromTagList = tagList.values

    expect(tagsFromTagList).toEqual(tags)
  })

  it('add a tag', () => {
    const tag = new Tag('veggies')
    const tagList = new TagList()

    tagList.add(tag)

    expect(tagList.values).toHaveLength(1)
    expect(tagList.values[0]).toEqual(tag)
  })

  it('add multiple tags', () => {
    const tag = new Tag('veggies')
    const tag2 = new Tag('drinks')
    const tagList = new TagList()

    tagList.add(tag, tag2)

    expect(tagList.values).toHaveLength(2)
    expect(tagList.values[0]).toEqual(tag)
    expect(tagList.values[1]).toEqual(tag2)
  })

  it('remove a tag by id', () => {
    const tags = [
      new Tag('veggies'),
      new Tag('drinks')
    ]
    const tagList = new TagList(tags)

    tagList.remove(tags[0].id)

    expect(tagList.values).toHaveLength(1)
    expect(tagList.values[0]).toEqual(tags[1])
  })

  it('remove a multiple tags by id', () => {
    const tags = [
      new Tag('veggies'),
      new Tag('drinks')
    ]
    const tagList = new TagList(tags)

    tagList.remove(...tags.map(({ id }) => id))

    expect(tagList.values).toHaveLength(0)
  })

  it('rename a tag by id', () => {
    const tags = [
      new Tag('veggies'),
      new Tag('drinks')
    ]
    const tagList = new TagList(tags)

    tagList.rename(tags[1].id, 'beer')

    expect(tagList.values[1].name).toBe('beer')
  })
})
