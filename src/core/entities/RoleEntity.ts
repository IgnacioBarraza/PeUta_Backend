import { UserEntity } from './UserEntity'

export class RoleEntity {
  uid: string
  name: string
  permissions: string[]

  constructor(data: RoleEntity) {
    this.uid = data.uid
    this.name = data.name
    this.permissions = data.permissions
  }
}
