import { TemplateItem, TemplateItemParams } from '../template-item'

interface ItemParams extends TemplateItemParams {
  checked?: boolean
  quantity?: number
  updatedAt: string
}

export class Item extends TemplateItem {
  private _checked: boolean
  private _quantity: number
  private _updatedAt: string

  constructor ({ checked, quantity, updatedAt, ...templateParams }: ItemParams) {
    super(templateParams)
    this._checked = checked ?? false
    this._quantity = quantity ?? 1
    this._updatedAt = updatedAt
  }

  get quantity () {
    return this._quantity
  }

  get updatedAt () {
    return this._updatedAt
  }

  isChecked () {
    return this._checked
  }

  check () {
    this._checked = true
    this.updateEditionDateTime()
  }

  uncheck () {
    this._checked = false
    this.updateEditionDateTime()
  }

  toggle () {
    this._checked = !this.isChecked()
    this.updateEditionDateTime()
  }

  increment (amount: number = 1) {
    this._quantity += amount
    this.updateEditionDateTime()
  }

  decrement (amount: number = 1) {
    this._quantity -= amount
    this.updateEditionDateTime()
  }

  private updateEditionDateTime () {
    this._updatedAt = new Date().toISOString()
  }
}
