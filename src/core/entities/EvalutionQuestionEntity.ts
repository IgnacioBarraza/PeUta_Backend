import { EvaluationScoreEntity } from './EvaluationScoresEntity'
import { ProjectCategoryEntity } from './ProjectCategoriesEntity'

export class EvaluationQuestionEntity {
  uid: string
  weight: number
  question: string
  minScore: number
  maxScore: number
  categories: ProjectCategoryEntity[]
  evaluationScores: EvaluationScoreEntity

  constructor(data: EvaluationQuestionEntity) {
    this.uid = data.uid
    this.weight = data.weight
    this.question = data.question
    this.minScore = data.minScore
    this.maxScore = data.maxScore
    this.categories = data.categories
    this.evaluationScores = data.evaluationScores
  }
}
