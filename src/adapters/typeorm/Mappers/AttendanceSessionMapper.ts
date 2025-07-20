import { AttendanceSessionEntity } from '../../../core/entities/AttendanceSessionEntity'
import { AttendanceSession } from '../schema/AttendanceSession'
import { EventMapper } from './EventMapper'

export const AttendanceSessionMapper = {
  toDomain(raw: AttendanceSession): AttendanceSessionEntity {
    return new AttendanceSessionEntity({
      id: raw.id,
      event: EventMapper.toDomain(raw.event),
      name: raw.name,
      date: raw.date,
      start_time: raw.start_time,
      end_time: raw.end_time,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: AttendanceSessionEntity): AttendanceSession {
    const attendance = new AttendanceSession()
    attendance.id = raw.id
    attendance.event = EventMapper.toSchema(raw.event)
    attendance.name = raw.name
    attendance.date = raw.date
    attendance.start_time = raw.start_time
    attendance.end_time = raw.end_time
    attendance.created_at = raw.created_at
    attendance.updated_at = raw.updated_at
    return attendance
  },
}
