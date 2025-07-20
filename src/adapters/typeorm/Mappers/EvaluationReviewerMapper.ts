import { EvaluationReviewerEntity } from '../../../core/entities/EvaluationReviewerEntity'
import { EvaluationReviewer } from '../schema/EvaluationReviewer'
import { EventMapper } from './EventMapper'
import { UserMapper } from './UserMapper'

export const EvaluationReviewerMapper = {
  toDomain(raw: EvaluationReviewer): EvaluationReviewerEntity {
    return new EvaluationReviewerEntity({
      id: raw.id,
      event: EventMapper.toDomain(raw.event),
      user: UserMapper.toDomain(raw.user),
      role: raw.role,
      assigned_forms: raw.assigned_forms,
    })
  },
  toSchema(raw: EvaluationReviewerEntity): EvaluationReviewer {
    const reviewer = new EvaluationReviewer()
    reviewer.id = raw.id
    reviewer.event = EventMapper.toSchema(raw.event)
    reviewer.user = UserMapper.toSchema(raw.user)
    reviewer.role = raw.role
    reviewer.assigned_forms = raw.assigned_forms
    return reviewer
  },
}
