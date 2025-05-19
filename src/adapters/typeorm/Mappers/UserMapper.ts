import { UserEntity } from '../../../core/entities/UserEntity'
import { User } from '../schema/User'
import { EvaluationMapper } from './EvaluationMapper'
import { RoleMapper } from './RoleMappers'

export const UserMapper = {
  toDomain(raw: User): UserEntity {
    return new UserEntity({
      uid: raw.uid,
      name: raw.name,
      rut: raw.rut,
      password: raw.password,
      role: RoleMapper.toDomain(raw.role),
      evaluations: raw.evaluations?.map(EvaluationMapper.toDomain),
    })
  },

  toSchema(raw: UserEntity): User {
    const user = new User()
    user.uid = raw.uid
    user.name = raw.name
    user.rut = raw.rut
    user.password = raw.password
    user.role = RoleMapper.toSchema(raw.role)
    user.evaluations = raw.evaluations?.map(EvaluationMapper.toSchema)
    return user
  },
}
