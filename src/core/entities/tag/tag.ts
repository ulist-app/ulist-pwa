import { Id } from '../id'
import { palette } from '../../constants'

interface TagParams {
  id?: Id
  name?: string
  color?: string
}

export class Tag {
  readonly id: Id
  readonly name: string
  readonly color: string

  constructor ({ id, name, color }: TagParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.color = color || palette.gray
  }
}
