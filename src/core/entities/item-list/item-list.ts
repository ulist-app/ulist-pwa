import { Item } from '../item'
import { Id } from '../id'
import { palette } from '../../constants'

interface ItemListParams {
  id?: Id;
  name?: string;
  color?: string;
  items?: Item[];
  template?: boolean;
}

export class ItemList {
  readonly id: Id
  readonly name: string
  readonly color: string
  readonly items: Item[]
  readonly template: boolean

  constructor ({ id, name, color, items, template }: ItemListParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.color = color || palette.gray
    this.items = items || []
    this.template = template ?? false
  }
}
