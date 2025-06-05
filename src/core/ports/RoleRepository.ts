import { RoleEntity } from '../entities/RoleEntity'

export interface RoleRepository {
  getAllRoles(): Promise<RoleEntity[]>
  getRoleById(uid: string): Promise<RoleEntity | null>
  getDefaultRole(): Promise<RoleEntity | null>
  createRole(data: Partial<RoleEntity>): Promise<RoleEntity>
  updateRole(uid: string, data: Partial<RoleEntity>): Promise<RoleEntity | null>
  deleteRole(uid: string): Promise<void>
}
