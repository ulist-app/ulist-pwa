import { v4 } from 'uuid'

export class Id {
  readonly value: string
  constructor (id: string = v4()) {
    this.value = id
  }
}
