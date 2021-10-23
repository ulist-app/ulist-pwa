import { Id } from '../id'

type ItemListId = Id

interface CategoryParams {
  id?: Id
  name?: string
  color?: string
  lists?: ItemListId[]
}

// TODO: Remove category from other entities
export class Category {
  readonly id: Id
  readonly name: string
  readonly color: string
  readonly lists: ItemListId[]

  constructor ({ id, name, color, lists }: CategoryParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.color = color || '#939393'
    this.lists = lists || []
  }
}
