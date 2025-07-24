import { EvaluationQuestionEntity } from './EvaluationQuestionEntity'
import { ProjectEvaluationEntity } from './ProjectEvaluationEntity'

export class EvaluationAnswerEntity {
  id: string
  evaluation?: ProjectEvaluationEntity
  question: EvaluationQuestionEntity
  score: number

  constructor(data: EvaluationAnswerEntity) {
    this.id = data.id
    this.evaluation = data.evaluation ?? undefined
    this.question = data.question
    this.score = data.score
  }
}
