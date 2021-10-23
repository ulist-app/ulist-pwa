import { Category } from './category'
import { Id } from '../id'

describe('Category should', () => {
  const categoryParams = {
    id: new Id(),
    name: 'Groceries',
    color: 'pink'
  }

  it('be created with id, name and color', () => {
    const category = new Category(categoryParams)

    expect(category.id.value).toBe(categoryParams.id.value)
    expect(category.name).toBe(categoryParams.name)
    expect(category.color).toBe(categoryParams.color)
  })

  it('be created with default id as Id', () => {
    const { name, color } = categoryParams
    const category = new Category({ name, color })

    expect(category.id).toBeInstanceOf(Id)
  })

  it('be created with default color', () => {
    const { name } = categoryParams
    const category = new Category({ name })

    expect(category.color).toBe('#939393')
  })
})
