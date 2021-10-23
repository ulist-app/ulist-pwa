import { Id } from '../id'
import { Tag } from '../tag'

interface ItemParams {
  id?: Id
  name?: string
  tags?: Tag[]
  checked?: boolean
  quantity?: number
}

export class Item {
  readonly id: Id
  readonly tags: Tag[]
  readonly name: string
  readonly checked: boolean
  readonly quantity: number

  constructor ({ id, name, tags, checked, quantity }: ItemParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.tags = tags || []
    this.checked = checked ?? false
    this.quantity = quantity ?? 1
  }
}
