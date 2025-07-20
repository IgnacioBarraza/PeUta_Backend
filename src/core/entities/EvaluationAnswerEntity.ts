import { EvaluationQuestionEntity } from './EvaluationQuestionEntity'
import { ProjectEvaluationEntity } from './ProjectEvaluationEntity'

export class EvaluationAnswerEntity {
  id: string
  evaluation: ProjectEvaluationEntity
  question: EvaluationQuestionEntity
  score: number
  comment?: string

  constructor(data: EvaluationAnswerEntity) {
    this.id = data.id
    this.evaluation = data.evaluation
    this.question = data.question
    this.score = data.score
    this.comment = data.comment
  }
}
