import { ClientEntity } from './ClientEntity'
import { RoleEntity } from './RoleEntity'

export class PendingClientStaffEntity {
  id: string
  email: string
  client: ClientEntity
  role: RoleEntity
  position?: string
  invite_token: string
  status: 'pending' | 'accepted' | 'expired' | 'revoked'
  expires_at: Date
  created_at: Date
  updated_at: Date

  constructor(data: PendingClientStaffEntity) {
    this.id = data.id
    this.email = data.email
    this.client = data.client
    this.role = data.role
    this.position = data.position
    this.invite_token = data.invite_token
    this.status = data.status
    this.expires_at = data.expires_at
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
