import { v4 } from 'uuid'

export class Id {
  readonly value: string
  constructor () {
    this.value = v4()
  }
}
