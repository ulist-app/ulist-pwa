import { Id } from '../id'

type ItemListId = Id
type TagId = Id

interface CategoryParams {
  id?: Id
  name?: string
  color?: string
  lists?: ItemListId[]
  tags?: TagId[]
}

export class Category {
  readonly id: Id
  readonly name: string
  readonly color: string
  readonly lists: ItemListId[]
  readonly tags: TagId[]

  constructor ({ id, name, color, lists, tags }: CategoryParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.color = color || '#939393'
    this.lists = lists || []
    this.tags = tags || []
  }
}
