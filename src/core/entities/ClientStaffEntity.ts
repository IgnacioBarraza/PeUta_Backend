import { ClientEntity } from './ClientEntity'
import { RoleEntity } from './RoleEntity'
import { UserEntity } from './UserEntity'

export class ClientStaffEntity {
  id: string
  user: UserEntity
  client: ClientEntity
  role: RoleEntity
  position: string
  created_at: Date
  updated_at: Date

  constructor(data: ClientStaffEntity) {
    this.id = data.id
    this.user = data.user
    this.client = data.client
    this.role = data.role
    this.position = data.position
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
