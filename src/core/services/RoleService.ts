import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { RoleEntity } from '../entities/RoleEntity'
import { RoleRepository } from '../ports/RoleRepository'
import { RoleValidation, UpdateRoleSchema } from '../validations/RoleValidation'

export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<RoleEntity[] | []> {
    const roles = await this.roleRepository.getAllRoles()
    if (roles.length === 0)
      throw new CustomError('Roles not found', 404, ['Roles no encontrados'])

    return roles
  }

  async getRoleById(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository.getRoleById(id)
    if (!role)
      throw new CustomError('Role not found', 404, ['Rol no encontrado'])

    return role
  }

  async createRole(role: Partial<RoleEntity>): Promise<RoleEntity> {
    const parsedData = RoleValidation.strict().safeParse(role)

    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)
    const data = parsedData.data

    const newRole = await this.roleRepository.createRole(data)

    if (!newRole)
      throw new CustomError('Error creating new role', 500, [
        'Error base de datos',
      ])

    return newRole
  }

  async updateRole(id: string, role: Partial<RoleEntity>): Promise<RoleEntity> {
    const parsedData = UpdateRoleSchema.strict().safeParse(role)

    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    await this.getRoleById(id)

    const data = parsedData.data

    const updated = await this.roleRepository.updateRole(id, data)
    if (!updated)
      throw new CustomError('Error updating role', 500, ['Error base de datos'])

    return updated
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepository.deleteRole(id)
  }
}
