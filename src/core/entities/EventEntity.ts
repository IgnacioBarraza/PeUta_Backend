import { EventStatus } from '../../adapters/typeorm/schema/Event'
import { AttendanceSessionEntity } from './AttendanceSessionEntity'
import { CategoryEntity } from './CategoryEntity'
import { ClientEntity } from './ClientEntity'
import { EvaluationFormEntity } from './EvaluationFormEntity'
import { EvaluationReviewerEntity } from './EvaluationReviewerEntity'
import { ProjectEntity } from './ProjectEntity'

export class EventEntity {
  id: string
  name: string
  sub_title?: string
  description: string
  date_start: Date
  date_end: Date
  location: string
  banner_url: string
  registration_method: 'email' | 'rut' | 'both'
  allow_public_evaluation: boolean
  status: EventStatus
  client: ClientEntity
  created_at: Date
  updated_at: Date

  // Relaciones opcionales
  projects?: ProjectEntity[]
  categories?: CategoryEntity[]
  forms?: EvaluationFormEntity[]
  reviewers?: EvaluationReviewerEntity[]
  attendance_sessions?: AttendanceSessionEntity[]

  constructor(data: EventEntity) {
    this.id = data.id
    this.name = data.name
    this.sub_title = data.sub_title
    this.description = data.description
    this.date_start = data.date_start
    this.date_end = data.date_end
    this.location = data.location
    this.banner_url = data.banner_url
    this.registration_method = data.registration_method
    this.allow_public_evaluation = data.allow_public_evaluation ?? false
    this.status = data.status ?? EventStatus.Pending
    this.client = data.client
    this.created_at = data.created_at
    this.updated_at = data.updated_at

    // Relaciones cargadas solo si están presentes
    this.projects = data.projects
    this.categories = data.categories
    this.forms = data.forms
    this.reviewers = data.reviewers
    this.attendance_sessions = data.attendance_sessions
  }
}
