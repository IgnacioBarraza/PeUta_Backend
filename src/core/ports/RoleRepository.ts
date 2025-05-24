import { RoleEntity } from '../entities/RoleEntity'

export interface RoleRepository {
  getRoleById(uid: string): Promise<RoleEntity>
  createRole(data: Partial<RoleEntity>): Promise<RoleEntity>
  updateRole(uid: string, data: Partial<RoleEntity>): Promise<RoleEntity>
  deleteRole(uid: string): Promise<RoleEntity>
}
