import { Tag } from '../tag'
import { Id } from '../id'

export class TagList {
  constructor (private tags: Tag[] = []) {}

  get values (): readonly Tag[] {
    return Object.freeze([...this.tags])
  }

  add (...tags: Tag[]): void {
    this.tags = [...this.values, ...tags]
  }

  remove (...ids: Id[]): void {
    const idsToRemove = ids.map(id => id.value)
    this.tags = this.values.filter(({ id }) => !idsToRemove.includes(id.value))
  }

  rename (id: Id, newName: string): void {
    this.tags = this.values.map(tag => {
      if (tag.id.value === id.value) {
        tag.rename(newName)
      }
      return tag
    })
  }
}
