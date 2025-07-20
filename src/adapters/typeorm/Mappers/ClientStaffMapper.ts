import { ClientStaffEntity } from '../../../core/entities/ClientStaffEntity'
import { ClientStaff } from '../schema/ClientStaff'
import { ClientMapper } from './ClientMapper'
import { RoleMapper } from './RoleMappers'
import { UserMapper } from './UserMapper'

export const ClientStaffMapper = {
  toDomain(raw: ClientStaff): ClientStaffEntity {
    return new ClientStaffEntity({
      id: raw.id,
      user: UserMapper.toDomain(raw.user),
      client: ClientMapper.toDomain(raw.client),
      role: RoleMapper.toDomain(raw.role),
      position: raw.position,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: ClientStaffEntity): ClientStaff {
    const clientStaff = new ClientStaff()
    clientStaff.id = raw.id
    clientStaff.user = UserMapper.toSchema(raw.user)
    clientStaff.client = ClientMapper.toSchema(raw.client)
    clientStaff.role = RoleMapper.toSchema(raw.role)
    clientStaff.position = raw.position
    clientStaff.created_at = raw.created_at
    clientStaff.updated_at = raw.updated_at
    return clientStaff
  },
}
