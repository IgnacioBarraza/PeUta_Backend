import { DataSource, Repository } from 'typeorm'
import { EventRepository } from '../../../core/ports/EventRepository'
import { EventEntity } from '../../../core/entities/EventEntity'
import { Event } from '../schema/Event'
import { EventMapper } from '../Mappers/EventMapper'

export class EventRepositoryImpl implements EventRepository {
  private db: DataSource
  private eventRepository: Repository<Event>

  constructor(db: DataSource) {
    this.db = db
    this.eventRepository = this.db.getRepository(Event)
  }

  async getAllEvents(): Promise<EventEntity[]> {
    const events = await this.eventRepository.find({
      relations: {
        client: true,
      },
    })

    return events.map(event => EventMapper.toDomain(event))
  }

  async getEventById(id: string): Promise<EventEntity | null> {
    const client = await this.eventRepository.findOne({
      where: { id: id },
      relations: {
        client: true,
      },
    })

    return client ? EventMapper.toDomain(client) : null
  }

  async getEventsByApikey(api_key: string): Promise<EventEntity[]> {
    const events = await this.eventRepository.find({
      where: { client: { api_key: api_key } },
      relations: {
        client: true,
      },
    })

    return events.map(event => EventMapper.toDomain(event))
  }

  async createEvent(
    eventData: Partial<EventEntity>
  ): Promise<EventEntity | null> {
    const newClient = this.eventRepository.create(
      EventMapper.toSchema(eventData as EventEntity)
    )
    await this.eventRepository.save(newClient)
    return EventMapper.toDomain(newClient)
  }

  async updateEvent(
    id: string,
    eventData: Partial<EventEntity>
  ): Promise<EventEntity | null> {
    await this.eventRepository.update(id, eventData)
    return await this.getEventById(id)
  }

  async deleteEvent(id: string): Promise<void> {
    await this.eventRepository.delete(id)
  }
}
