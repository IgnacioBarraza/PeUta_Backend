import { ClientEntity } from '../../../core/entities/ClientEntity'
import { Client } from '../schema/Client'
import { ClientStaffMapper } from './ClientStaffMapper'
import { EventMapper } from './EventMapper'

export const ClientMapper = {
  toDomain(raw: Client): ClientEntity {
    return new ClientEntity({
      id: raw.id,
      name: raw.name,
      api_key: raw.api_key,
      contact_email: raw.contact_email,
      logo_url: raw.logo_url,
      staff: raw.staff ? raw.staff.map(ClientStaffMapper.toDomain) : [],
      events: raw.events ? raw.events.map(EventMapper.toDomain) : [],
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: ClientEntity): Client {
    const client = new Client()
    client.id = raw.id
    client.name = raw.name
    client.api_key = raw.api_key
    client.contact_email = raw.contact_email
    client.logo_url = raw.logo_url
    client.staff = raw.staff ? raw.staff.map(ClientStaffMapper.toSchema) : []
    client.events = raw.events ? raw.events.map(EventMapper.toSchema) : []
    client.created_at = raw.created_at
    client.updated_at = raw.updated_at
    return client
  },
}
