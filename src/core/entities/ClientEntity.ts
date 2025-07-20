import { ClientStaffEntity } from './ClientStaffEntity'
import { EventEntity } from './EventEntity'

export class ClientEntity {
  id: string
  name: string
  api_key: string
  contact_email: string
  logo_url?: string
  staff: ClientStaffEntity[]
  events: EventEntity[]
  created_at: Date
  updated_at: Date

  constructor(data: ClientEntity) {
    this.id = data.id
    this.name = data.name
    this.api_key = data.api_key
    this.contact_email = data.contact_email
    this.logo_url = data.logo_url
    this.staff = data.staff
    this.events = data.events
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
