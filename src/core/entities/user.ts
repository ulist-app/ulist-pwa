import { Space } from './space'
import { Id } from './id'

export interface UserInfo {
  id: Id
  firstName: string
  lastName: string
  username: string
  email: string
  createdAt: string
  spaces: Space[]
}

export interface User extends UserInfo {
  password: string
}
