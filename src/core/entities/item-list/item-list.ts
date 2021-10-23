import { Item } from '../item'
import { Id } from '../id'

interface ItemListParams {
  id?: Id;
  name?: string;
  items?: Item[];
  template?: boolean;
}

export class ItemList {
  readonly id: Id
  readonly name: string
  readonly items: Item[]
  readonly template: boolean

  constructor ({ id, name, items, template }: ItemListParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.items = items || []
    this.template = template ?? false
  }
}
