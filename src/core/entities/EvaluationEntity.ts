import { EvaluationScoreEntity } from "./EvaluationScoresEntity"
import { ProjectEntity } from "./ProjectEntity"
import { UserEntity } from "./UserEntity"

export class EvaluationEntity {
  uid: string
  finalScore: number
  createdAt: Date
  user: UserEntity
  project: ProjectEntity // change to Project
  evaluationScores: EvaluationScoreEntity[] // change to EvaluationScores

  constructor(data: EvaluationEntity) {
    this.uid = data.uid
    this.finalScore = data.finalScore
    this.createdAt = data.createdAt
    this.user = data.user
    this.project = data.project
    this.evaluationScores = data.evaluationScores
  }
}