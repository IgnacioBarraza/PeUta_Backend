import { EvaluationEntity } from "./EvaluationEntity"
import { EvaluationQuestionEntity } from "./EvalutionQuestionEntity"

export class EvaluationScoreEntity {
  uid: string
  score: number
  evaluations: EvaluationEntity
  questions: EvaluationQuestionEntity

  constructor(data: EvaluationScoreEntity) {
    this.uid = data.uid
    this.score = data.score
    this.evaluations = data.evaluations
    this.questions = data.questions
  }
}