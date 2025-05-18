import { UserEntity } from "./UserEntity"

export class RoleEntity {
  uid: string
  name: string
  users: UserEntity[]
  permissions: string[]

  constructor(data: RoleEntity) {
    this.uid = data.uid
    this.name = data.name
    this.users = data.users
    this.permissions = data.permissions
  }
}