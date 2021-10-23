import { Id } from '../id'

interface CategoryParams {
  id?: Id
  name: string
  color?: string
}

export class Category {
  readonly id: Id
  readonly name: string
  readonly color: string

  constructor ({ id = new Id(), name, color = '#939393' }: CategoryParams) {
    this.id = id
    this.name = name
    this.color = color
  }
}
