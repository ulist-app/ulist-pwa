import { Id } from '../id'

interface TagParams {
  id?: Id
  name?: string
}

export class Tag {
  readonly id: Id
  readonly name: string
  constructor ({ id, name }: TagParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
  }
}
