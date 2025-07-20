import { EvaluationFormEntity } from '../../../core/entities/EvaluationFormEntity'
import { EvaluationForm } from '../schema/EvaluationForm'
import { EvaluationQuestionMapper } from './EvaluationQuestionMapper'
import { EventMapper } from './EventMapper'

export const EvaluationFormMapper = {
  toDomain(raw: EvaluationForm): EvaluationFormEntity {
    return new EvaluationFormEntity({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      event: EventMapper.toDomain(raw.event),
      questions: raw.questions.map(EvaluationQuestionMapper.toDomain),
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: EvaluationFormEntity): EvaluationForm {
    const evaluationForm = new EvaluationForm()
    evaluationForm.id = raw.id
    evaluationForm.name = raw.name
    evaluationForm.description = raw.description
    evaluationForm.event = EventMapper.toSchema(raw.event)
    evaluationForm.questions = raw.questions.map(
      EvaluationQuestionMapper.toSchema
    )
    evaluationForm.created_at = raw.created_at
    evaluationForm.updated_at = raw.updated_at
    return evaluationForm
  },
}
