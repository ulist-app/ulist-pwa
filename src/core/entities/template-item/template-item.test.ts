import { Category } from '../category'
import { TemplateItem } from './template-item'
import { TagList } from '../tag-list'
import { Id } from '../id'
import { Tag } from '../tag'

describe('Template item should', () => {
  const templateItemParams = {
    id: new Id(),
    name: 'irrelevant name',
    category: new Category({ name: 'Groceries', color: 'irrelevant color' }),
    tags: new TagList([new Tag('veggies')])
  }

  describe('be created', () => {
    it('successfully', () => {
      const templateItem = new TemplateItem(templateItemParams)

      expect(templateItem.id).toEqual(templateItemParams.id)
      expect(templateItem.name).toEqual(templateItemParams.name)
      expect(templateItem.category).toEqual(templateItemParams.category)
      expect(templateItem.tags).toEqual(templateItemParams.tags)
    })

    it('with default id as unique id', () => {
      const { name, category, tags } = templateItemParams
      const templateItem = new TemplateItem({ name, category, tags })

      expect(templateItem.id).toBeInstanceOf(Id)
      expect(templateItem.name).toEqual(name)
      expect(templateItem.category).toEqual(category)
      expect(templateItem.tags).toEqual(tags)
    })

    it('with default tags as an empty list', () => {
      const { id, name, category } = templateItemParams
      const templateItem = new TemplateItem({ id, name, category })

      expect(templateItem.id).toEqual(id)
      expect(templateItem.name).toEqual(name)
      expect(templateItem.category).toEqual(category)
      expect(templateItem.tags).toEqual(new TagList())
    })
  })

  it('rename item', () => {
    const templateItem = new TemplateItem(templateItemParams)
    const newName = 'new item name'

    templateItem.rename(newName)

    expect(templateItem.id).toEqual(templateItemParams.id)
    expect(templateItem.name).toEqual(newName)
    expect(templateItem.category).toEqual(templateItemParams.category)
    expect(templateItem.tags).toEqual(templateItemParams.tags)
  })

  it('update category', () => {
    const templateItem = new TemplateItem(templateItemParams)
    const newCategory = new Category({ name: 'Things to do' })

    templateItem.setCategory(newCategory)

    expect(templateItem.id).toEqual(templateItemParams.id)
    expect(templateItem.name).toEqual(templateItemParams.name)
    expect(templateItem.category).toEqual(newCategory)
    expect(templateItem.tags).toEqual(templateItemParams.tags)
  })
})
