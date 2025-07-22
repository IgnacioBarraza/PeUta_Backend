import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { EventEntity } from '../entities/EventEntity'
import { ClientRepository } from '../ports/ClientRepository'
import { EventRepository } from '../ports/EventRepository'
import {
  CreateEventSchema,
  UpdateEventSchema,
} from '../validations/EventValidation'

export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private clientRepository: ClientRepository
  ) {}

  async getAllEventsByApikey(api_key: string): Promise<EventEntity[]> {
    const events = await this.eventRepository.getAllEventsByApikey(api_key)
    if (events.length === 0)
      throw new CustomError('No events found', 404, ['No events found'])
    return events
  }

  async getEventByIdAndApikey(
    id: string,
    api_key: string
  ): Promise<EventEntity> {
    const event = await this.eventRepository.getEventByIdAndApikey(id, api_key)
    if (!event)
      throw new CustomError('Event not found', 404, ['Event not found'])
    return event
  }

  async createEvent(
    event: Partial<EventEntity>,
    api_key: string
  ): Promise<EventEntity> {
    const parsedData = CreateEventSchema.strict().safeParse(event)
    if (!parsedData.success)
      throw new CustomError('Invalid event data', 400, parsedData.error)

    const data = parsedData.data

    const client = await this.clientRepository.getClientById(data.client_id)
    if (!client)
      throw new CustomError('Client not found', 404, ['Client not found'])

    const newEvent = await this.eventRepository.createEvent(
      {
        ...data,
        client: client,
      },
      api_key
    )

    if (!newEvent)
      throw new CustomError('Event not created', 500, ['Event not created'])

    return newEvent
  }

  async updateEvent(
    id: string,
    event: Partial<EventEntity>,
    api_key: string
  ): Promise<EventEntity> {
    const parsedData = UpdateEventSchema.strict().safeParse(event)
    if (!parsedData.success)
      throw new CustomError('Invalid event data', 400, parsedData.error)

    const data = parsedData.data

    const updated = await this.eventRepository.updateEvent(id, data, api_key)
    if (!updated)
      throw new CustomError('Event not updated', 500, ['Event not updated'])

    return updated
  }

  async deleteEvent(id: string, api_key: string): Promise<boolean> {
    const deleted = await this.eventRepository.deleteEvent(id, api_key)

    if (!deleted)
      throw new CustomError('Event not deleted', 500, ['Event not deleted'])

    return deleted
  }
}
