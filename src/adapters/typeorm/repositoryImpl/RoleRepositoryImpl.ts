import { DataSource, Repository } from "typeorm";
import { RoleRepository } from "../../../core/ports/RoleRepository";
import { Role } from "../schema/Role";
import { RoleEntity } from "../../../core/entities/RoleEntity";
import { RoleMapper } from "../Mappers/RoleMappers";

export class RoleRepositoryImpl implements RoleRepository {
  private db: DataSource
  private roleRepo: Repository<Role>

  constructor(db: DataSource) {
    this.db = db
    this.roleRepo = this.db.getRepository(Role)
  }

  async getAllRoles(): Promise<RoleEntity[] | []> {
    const roles = await this.roleRepo.find()

    return roles.map(r => new RoleEntity(r))
  }

  async getRoleById(uid: string): Promise<RoleEntity | null> {
    const role = await this.roleRepo.findOne({
      where: { uid: uid}
    })

    return role ? RoleMapper.toDomain(role) : null
  }

  async getDefaultRole(): Promise<RoleEntity | null> {
    const role = await this.roleRepo.findOne({
      where: { name: 'user'}
    })

    return role ? RoleMapper.toDomain(role) : null
  }

  async createRole(data: Partial<RoleEntity>): Promise<RoleEntity> {
    const ormRoleData = RoleMapper.toSchema(data as RoleEntity)
    const newRole = this.roleRepo.create(ormRoleData)
    const savedRole = await this.roleRepo.save(newRole)

    return RoleMapper.toDomain(savedRole)
  }

  async updateRole(uid: string, data: Partial<RoleEntity>): Promise<RoleEntity | null> {
    await this.roleRepo.update(uid, data)
    return await this.getRoleById(uid)
  }

  async deleteRole(uid: string): Promise<void> {
    await this.roleRepo.delete(uid)
  }
}