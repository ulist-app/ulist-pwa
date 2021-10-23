import { Category } from '../category'
import { Id } from '../id'
import { TagList } from '../tag-list'

export interface TemplateItemParams {
  id?: Id
  name: string
  category: Category
  tags?: TagList
}

export class TemplateItem {
  readonly id: Id
  readonly tags: TagList
  private _name: string
  private _category: Category

  constructor ({ id = new Id(), name, category, tags }: TemplateItemParams) {
    this.id = id
    this._name = name
    this._category = category
    this.tags = tags || new TagList()
  }

  get name () {
    return this._name
  }

  get category () {
    return this._category
  }

  rename (newName: string): void {
    this._name = newName
  }

  setCategory (newCategory: Category): void {
    this._category = newCategory
  }
}
