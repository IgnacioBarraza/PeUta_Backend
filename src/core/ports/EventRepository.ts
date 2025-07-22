import { EventEntity } from '../entities/EventEntity'

export interface EventRepository {
  getAllEventsByApikey(api_key: string): Promise<EventEntity[]>
  getEventByIdAndApikey(
    id: string,
    api_key: string
  ): Promise<EventEntity | null>
  // getEventsByStatus(status: string): Promise<EventEntity[]>
  createEvent(
    eventData: Partial<EventEntity>,
    api_key: string
  ): Promise<EventEntity | null>
  updateEvent(
    id: string,
    eventData: Partial<EventEntity>,
    api_key: string
  ): Promise<EventEntity | null>
  deleteEvent(id: string, api_key: string): Promise<boolean>
}
