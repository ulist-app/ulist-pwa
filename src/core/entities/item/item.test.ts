import { Item } from './item'
import { Category } from '../category'
import { TagList } from '../tag-list'
import { Id } from '../id'
import { Tag } from '../tag'

function wait (milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

describe('Item should', () => {
  const itemParams = {
    id: new Id(),
    name: 'irrelevant-name',
    category: new Category({ name: 'Groceries', color: 'irrelevant color' }),
    tags: new TagList([new Tag('veggies')]),
    checked: true,
    quantity: 2,
    updatedAt: new Date('2021-11-01').toISOString()
  }

  describe('be created', () => {
    it('successfully', () => {
      const item = new Item(itemParams)

      expect(item.id).toEqual(itemParams.id)
      expect(item.name).toEqual(itemParams.name)
      expect(item.category).toEqual(itemParams.category)
      expect(item.tags).toEqual(itemParams.tags)
      expect(item.isChecked()).toEqual(itemParams.checked)
      expect(item.quantity).toEqual(itemParams.quantity)
      expect(item.updatedAt).toEqual(itemParams.updatedAt)
    })
    it('with default checked as false', () => {
      const { id, updatedAt, name, category } = itemParams
      const item = new Item({ id, updatedAt, name, category })

      expect(item.isChecked()).toBeFalsy()
    })
    it('with default quantity as 1', () => {
      const { id, updatedAt, name, category } = itemParams
      const item = new Item({ id, updatedAt, name, category })

      expect(item.quantity).toBe(1)
    })
  })

  it('toggle', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, checked: false })

    item.toggle()

    expect(item.isChecked()).toBeTruthy()
  })

  it('check', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, checked: false })

    item.check()
    expect(item.isChecked()).toBeTruthy()

    item.toggle()
    item.check()
    expect(item.isChecked()).toBeTruthy()
  })

  it('uncheck', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, checked: true })

    item.uncheck()
    expect(item.isChecked()).toBeFalsy()

    item.toggle()
    item.uncheck()
    expect(item.isChecked()).toBeFalsy()
  })

  it('increment quantity by one by default', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, quantity: 42 })

    item.increment()

    expect(item.quantity).toBe(43)
  })

  it('increment quantity by given number', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, quantity: 42 })

    item.increment(10)

    expect(item.quantity).toBe(52)
  })

  it('decrement quantity by one by default', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, quantity: 42 })

    item.decrement()

    expect(item.quantity).toBe(41)
  })

  it('decrement quantity by given number', () => {
    const { id, updatedAt, name, category } = itemParams
    const item = new Item({ id, updatedAt, name, category, quantity: 42 })

    item.decrement(10)

    expect(item.quantity).toBe(32)
  })

  describe('update updateAt time on', () => {
    it('toggle', async () => {
      const before = Date.now()
      const { id, name, category } = itemParams
      const item = new Item({
        id,
        name,
        category,
        updatedAt: new Date(before).toISOString(),
        checked: false
      })
      await wait(5)

      item.toggle()

      expect(new Date(item.updatedAt).getTime()).toBeGreaterThan(before)
    })

    it('check', async () => {
      const before = Date.now()
      const { id, name, category } = itemParams
      const item = new Item({
        id,
        name,
        category,
        updatedAt: new Date(before).toISOString(),
        checked: false
      })
      await wait(5)

      item.check()

      expect(new Date(item.updatedAt).getTime()).toBeGreaterThan(before)
    })

    it('uncheck', async () => {
      const before = Date.now()
      const { id, name, category } = itemParams
      const item = new Item({
        id,
        name,
        category,
        updatedAt: new Date(before).toISOString(),
        checked: false
      })
      await wait(5)

      item.uncheck()

      expect(new Date(item.updatedAt).getTime()).toBeGreaterThan(before)
    })

    it('increment quantity', async () => {
      const before = Date.now()
      const { id, name, category } = itemParams
      const item = new Item({
        id,
        name,
        category,
        updatedAt: new Date(before).toISOString(),
        checked: false
      })
      await wait(5)

      item.increment()

      expect(new Date(item.updatedAt).getTime()).toBeGreaterThan(before)
    })

    it('decrement quantity', async () => {
      const before = Date.now()
      const { id, name, category } = itemParams
      const item = new Item({
        id,
        name,
        category,
        updatedAt: new Date(before).toISOString(),
        checked: false
      })
      await wait(5)

      item.decrement()

      expect(new Date(item.updatedAt).getTime()).toBeGreaterThan(before)
    })
  })
})
