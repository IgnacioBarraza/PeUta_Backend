import { PendingClientStaffEntity } from '../../../core/entities/PendingClientStaffEntity'
import { PendingClientStaff } from '../schema/PendingClientStaff'
import { ClientMapper } from './ClientMapper'
import { RoleMapper } from './RoleMappers'

export const PendingClientStaffMapper = {
  toDomain(raw: PendingClientStaff): PendingClientStaffEntity {
    return new PendingClientStaffEntity({
      id: raw.id,
      email: raw.email,
      client: ClientMapper.toDomain(raw.client),
      role: RoleMapper.toDomain(raw.role),
      position: raw.position,
      invite_token: raw.invite_token,
      status: raw.status,
      expires_at: raw.expires_at,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: PendingClientStaffEntity): PendingClientStaff {
    const pendingClientStaff = new PendingClientStaff()
    pendingClientStaff.id = raw.id
    pendingClientStaff.email = raw.email
    pendingClientStaff.client = ClientMapper.toSchema(raw.client)
    pendingClientStaff.role = RoleMapper.toSchema(raw.role)
    pendingClientStaff.position = raw.position || ''
    pendingClientStaff.invite_token = raw.invite_token
    pendingClientStaff.status = raw.status
    pendingClientStaff.expires_at = raw.expires_at
    pendingClientStaff.created_at = raw.created_at
    pendingClientStaff.updated_at = raw.updated_at
    return pendingClientStaff
  },
}
