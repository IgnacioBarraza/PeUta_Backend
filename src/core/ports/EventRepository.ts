import { EventEntity } from '../entities/EventEntity'

export interface EventRepository {
  getAllEvents(): Promise<EventEntity[]>
  getEventById(id: string): Promise<EventEntity | null>
  getEventsByApikey(api_key: string): Promise<EventEntity[]>
  // getEventsByStatus(status: string): Promise<EventEntity[]>
  createEvent(eventData: Partial<EventEntity>): Promise<EventEntity | null>
  updateEvent(
    id: string,
    eventData: Partial<EventEntity>
  ): Promise<EventEntity | null>
  deleteEvent(id: string): Promise<void>
}
