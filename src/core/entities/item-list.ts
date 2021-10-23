import { Item } from './item'
import { Id } from './id'

export interface ItemList {
  id: Id;
  template: boolean;
  name: string;
  items: Item[];
}
