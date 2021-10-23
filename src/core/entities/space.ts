import { User } from './user'
import { Id } from './id'

export interface Space {
  id: Id
  name: string
  users: User[]
  adminUsers: User[]
  pendingUsers: User[]
}
