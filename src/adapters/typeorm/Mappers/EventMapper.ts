import { EventEntity } from '../../../core/entities/EventEntity'
import { Event } from '../schema/Event'
import { ClientMapper } from './ClientMapper'

export const EventMapper = {
  toDomain(raw: Event): EventEntity {
    return new EventEntity({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      date_start: raw.date_start,
      date_end: raw.date_end,
      location: raw.location,
      banner_url: raw.banner_url,
      client: ClientMapper.toDomain(raw.client),
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: EventEntity): Event {
    const event = new Event()
    event.id = raw.id
    event.name = raw.name
    event.description = raw.description
    event.date_start = raw.date_start
    event.date_end = raw.date_end
    event.location = raw.location
    event.banner_url = raw.banner_url
    event.client = ClientMapper.toSchema(raw.client)
    event.created_at = raw.created_at
    event.updated_at = raw.updated_at
    return event
  },
}
