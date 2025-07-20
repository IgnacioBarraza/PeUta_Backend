import { EventEntity } from './EventEntity'
import { UserEntity } from './UserEntity'

export class EvaluationReviewerEntity {
  id: string
  event: EventEntity
  user: UserEntity
  role: string
  assigned_forms?: number

  constructor(data: EvaluationReviewerEntity) {
    this.id = data.id
    this.event = data.event
    this.user = data.user
    this.role = data.role
    this.assigned_forms = data.assigned_forms
  }
}
