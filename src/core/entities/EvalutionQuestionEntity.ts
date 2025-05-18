import { EvaluationScoreEntity } from "./EvaluationScoresEntity"

export class EvaluationQuestionEntity {
  uid: string
  weight: number
  question: string
  minScore: number
  maxScore: number
  categories: string[]
  evaluationScore: EvaluationScoreEntity

  constructor(data: EvaluationQuestionEntity) {
    this.uid = data.uid
    this.weight = data.weight
    this.question = data.question
    this.minScore = data.minScore
    this.maxScore = data.maxScore
    this.categories = data.categories
    this.evaluationScore = data.evaluationScore
  }
}