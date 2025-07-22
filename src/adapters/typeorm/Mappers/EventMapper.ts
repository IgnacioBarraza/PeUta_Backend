import { ClientEntity } from '../../../core/entities/ClientEntity'
import { EventEntity } from '../../../core/entities/EventEntity'
import { Event } from '../schema/Event'
import { AttendanceSessionMapper } from './AttendanceSessionMapper'
import { CategoryMapper } from './CategoryMapper'
import { ClientMapper } from './ClientMapper'
import { EvaluationFormMapper } from './EvaluationFormMapper'
import { EvaluationReviewerMapper } from './EvaluationReviewerMapper'
import { ProjectMapper } from './ProjectMapper'

export const EventMapper = {
  toDomain(raw: Event): EventEntity {
    const clientLight = new ClientEntity({
      id: raw.client.id,
      name: raw.client.name,
      api_key: raw.client.api_key,
      contact_email: raw.client.contact_email,
      logo_url: raw.client.logo_url,
      staff: [],
      events: [],
      created_at: raw.client.created_at,
      updated_at: raw.client.updated_at,
    })

    return new EventEntity({
      id: raw.id,
      name: raw.name,
      sub_title: raw.sub_title ?? '',
      description: raw.description,
      date_start: raw.date_start,
      date_end: raw.date_end,
      location: raw.location,
      banner_url: raw.banner_url,
      client: clientLight,
      projects: raw.projects?.map(ProjectMapper.toDomain) ?? [],
      categories: raw.categories?.map(CategoryMapper.toDomain) ?? [],
      forms: raw.forms?.map(EvaluationFormMapper.toDomain) ?? [],
      reviewers: raw.reviewers?.map(EvaluationReviewerMapper.toDomain) ?? [],
      attendance_sessions:
        raw.attendance_sessions?.map(AttendanceSessionMapper.toDomain) ?? [],
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: EventEntity): Event {
    const event = new Event()
    event.id = raw.id
    event.name = raw.name
    event.sub_title = raw.sub_title ?? ''
    event.description = raw.description
    event.date_start = raw.date_start
    event.date_end = raw.date_end
    event.location = raw.location
    event.banner_url = raw.banner_url
    event.client = ClientMapper.toSchema(raw.client)
    event.projects = raw.projects?.map(ProjectMapper.toSchema) ?? []
    event.categories = raw.categories?.map(CategoryMapper.toSchema) ?? []
    event.forms = raw.forms?.map(EvaluationFormMapper.toSchema) ?? []
    event.reviewers =
      raw.reviewers?.map(EvaluationReviewerMapper.toSchema) ?? []
    event.attendance_sessions =
      raw.attendance_sessions?.map(AttendanceSessionMapper.toSchema) ?? []
    event.created_at = raw.created_at
    event.updated_at = raw.updated_at
    return event
  },
}
