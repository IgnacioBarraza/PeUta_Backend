import { CustomError } from "../../infrastructure/middlewares/errorHandler";
import { RoleEntity } from "../entities/RoleEntity";
import { RoleRepository } from "../ports/RoleRepository";

export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<RoleEntity[] | []> {
    const roles = await this.roleRepository.getAllRoles()
    if (roles.length === 0) throw new CustomError('Roles not found', 404, ['Roles no encontrados'])

    return roles
  }

  async getRoleById(uid: string): Promise<RoleEntity> {
    const role = await this.roleRepository.getRoleById(uid)
    if (!role) throw new CustomError('Role not found', 404, ['Rol no encontrado'])

    return role
  }

  async createRole(data: Partial<RoleEntity>): Promise<RoleEntity> {
    const parsedData =
  }
}