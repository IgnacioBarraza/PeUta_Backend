import { DataSource, Repository } from 'typeorm'
import { EventRepository } from '../../../core/ports/EventRepository'
import { EventEntity } from '../../../core/entities/EventEntity'
import { Event } from '../schema/Event'
import { EventMapper } from '../Mappers/EventMapper'
import { ClientService } from '../../../core/services/ClientService'

export class EventRepositoryImpl implements EventRepository {
  private db: DataSource
  private eventRepository: Repository<Event>
  private clientService: ClientService

  constructor(db: DataSource, clientService: ClientService) {
    this.db = db
    this.eventRepository = this.db.getRepository(Event)
    this.clientService = clientService
  }

  async getAllEventsByApikey(api_key: string): Promise<EventEntity[]> {
    const events = await this.eventRepository.find({
      where: { client: { api_key: api_key } },
      relations: {
        client: true,
        categories: true,
        projects: {
          category: true,
          members: true,
        },
        forms: {
          questions: true,
        },
      },
    })

    return events.map(event => EventMapper.toDomain(event))
  }

  async getEventByIdAndApikey(
    id: string,
    api_key: string
  ): Promise<EventEntity | null> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
        client: { api_key: api_key },
      },
      relations: {
        client: true,
        categories: true,
        projects: {
          category: true,
          members: true,
        },
        forms: {
          questions: true,
        },
      },
    })

    return event ? EventMapper.toDomain(event) : null
  }

  async createEvent(
    eventData: Partial<EventEntity>,
    api_key: string
  ): Promise<EventEntity | null> {
    const client = await this.clientService.getClientByApikey(api_key)

    const newEvent = this.eventRepository.create({
      ...EventMapper.toSchema(eventData as EventEntity),
      client: client!,
    })
    await this.eventRepository.save(newEvent)
    return EventMapper.toDomain(newEvent)
  }

  async updateEvent(
    id: string,
    eventData: Partial<EventEntity>,
    api_key: string
  ): Promise<EventEntity | null> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
        client: { api_key: api_key },
      },
    })

    if (!event) return null

    await this.eventRepository.update(id, eventData)
    return await this.getEventByIdAndApikey(id, api_key)
  }

  async deleteEvent(id: string, api_key: string): Promise<boolean> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
        client: { api_key: api_key },
      },
    })

    if (!event) return false

    await this.eventRepository.delete(id)
    return true
  }
}
