import { RoleEntity } from './RoleEntity'

export class UserEntity {
  id: string
  name: string
  email?: string
  rut?: string
  password: string
  created_at: Date
  updated_at: Date
  role?: RoleEntity

  constructor(data: UserEntity) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.rut = data.rut
    this.password = data.password
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.role = data.role ?? undefined
  }
}
