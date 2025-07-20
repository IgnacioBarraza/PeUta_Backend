import { EventEntity } from './EventEntity'

export class AttendanceSessionEntity {
  id: string
  event: EventEntity
  name: string
  date: Date
  start_time: string
  end_time: string
  created_at: Date
  updated_at: Date

  constructor(data: AttendanceSessionEntity) {
    this.id = data.id
    this.event = data.event
    this.name = data.name
    this.date = data.date
    this.start_time = data.start_time
    this.end_time = data.end_time
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
