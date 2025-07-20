import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { RoleEntity } from '../entities/RoleEntity'
import { RoleRepository } from '../ports/RoleRepository'
import { RoleValidation } from '../validations/RoleValidation'

export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<RoleEntity[] | []> {
    const roles = await this.roleRepository.getAllRoles()
    if (roles.length === 0)
      throw new CustomError('Roles not found', 404, ['Roles no encontrados'])

    return roles
  }

  async getRoleById(uid: string): Promise<RoleEntity> {
    const role = await this.roleRepository.getRoleById(uid)
    if (!role)
      throw new CustomError('Role not found', 404, ['Rol no encontrado'])

    return role
  }

  async createRole(role: Partial<RoleEntity>): Promise<RoleEntity> {
    const parsedData = RoleValidation.safeParse(role)

    if (!parsedData.success)
      throw new CustomError('Invalid form', 400, parsedData.error)
    const data = parsedData.data

    const newRole = await this.roleRepository.createRole(data)

    if (!newRole)
      throw new CustomError('Error creating new role', 500, [
        'Error base de datos',
      ])

    return newRole
  }

  async updateRole(
    uid: string,
    data: Partial<RoleEntity>
  ): Promise<RoleEntity> {
    const { name, description, label } = data

    const role = await this.getRoleById(uid)

    const updatedRoleData = {
      name: name ?? role.name,
      description: description ?? role.description,
      label: label ?? role.label,
    }

    const updatedRole = await this.roleRepository.updateRole(
      uid,
      updatedRoleData
    )
    if (!updatedRole)
      throw new CustomError('Error updating role', 500, ['Error base de datos'])

    return updatedRole
  }

  async deleteRole(uid: string): Promise<void> {
    await this.roleRepository.deleteRole(uid)
  }
}
