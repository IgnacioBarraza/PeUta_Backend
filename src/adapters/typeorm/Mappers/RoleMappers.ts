import { Role } from '../schema/Role'
import { RoleEntity } from '../../../core/entities/RoleEntity'

export const RoleMapper = {
  toDomain(role: Role): RoleEntity {
    return new RoleEntity({
      uid: role.uid,
      name: role.name,
      permissions: role.permissions,
    })
  },

  toSchema(entity: RoleEntity): Role {
    const role = new Role()
    role.uid = entity.uid
    role.name = entity.name
    role.permissions = entity.permissions
    return role
  },
}
