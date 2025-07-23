import { EvaluationQuestionEntity } from './EvaluationQuestionEntity'
import { EventEntity } from './EventEntity'

export class EvaluationFormEntity {
  id: string
  name: string
  description: string
  event?: EventEntity
  questions?: EvaluationQuestionEntity[]
  created_at: Date
  updated_at: Date

  constructor(data: EvaluationFormEntity) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.event = data.event
    this.questions = data.questions ?? []
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
