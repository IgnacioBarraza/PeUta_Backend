import { UserEntity } from '../../../core/entities/UserEntity'
import { User } from '../schema/User'
import { RoleMapper } from './RoleMappers'

export const UserMapper = {
  toDomain(raw: User): UserEntity {
    return new UserEntity({
      id: raw.id,
      name: raw.name,
      rut: raw.rut,
      email: raw.email,
      password: raw.password,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      role: RoleMapper.toDomain(raw.role),
    })
  },

  toSchema(raw: UserEntity): User {
    const user = new User()
    user.id = raw.id
    user.name = raw.name
    user.rut = raw.rut
    user.email = raw.email
    user.password = raw.password
    user.created_at = raw.created_at
    user.updated_at = raw.updated_at
    user.role = RoleMapper.toSchema(raw.role)
    return user
  },
}
