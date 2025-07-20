import { Role } from '../schema/Role'
import { RoleEntity } from '../../../core/entities/RoleEntity'

export const RoleMapper = {
  toDomain(role: Role): RoleEntity {
    return new RoleEntity({
      id: role.id,
      name: role.name,
      description: role.description,
      label: role.label,
    })
  },

  toSchema(entity: RoleEntity): Role {
    const role = new Role()
    role.id = entity.id
    role.name = entity.name
    role.description = entity.description
    role.label = entity.label
    return role
  },
}
