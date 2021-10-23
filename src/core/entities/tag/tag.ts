import { Id } from '../id'

export class Tag {
  private _name: string
  constructor (
    name: string,
    readonly id: Id = new Id()
  ) {
    this._name = name
  }

  get name () {
    return this._name
  }

  rename (newName: string) {
    this._name = newName
  }
}
