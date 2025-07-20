import { EvaluationFormEntity } from './EvaluationFormEntity'

export class EvaluationQuestionEntity {
  id: string
  form: EvaluationFormEntity
  question: string
  weigth: number
  order: number
  created_at: Date
  updated_at: Date

  constructor(data: EvaluationQuestionEntity) {
    this.id = data.id
    this.form = data.form
    this.question = data.question
    this.weigth = data.weigth
    this.order = data.order
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
