import { EvaluationEntity } from "./EvaluationEntity"

export class ProjectEntity {
  uid: string
  projectName: string
  description: string
  category: string
  imageUrl: string
  averageScore: number
  members: Record<string, string>[]
  evaluations: EvaluationEntity[]

  constructor(data: ProjectEntity) {
    this.uid = data.uid
    this.projectName = data.projectName
    this.description = data.description
    this.category = data.category
    this.imageUrl = data.imageUrl
    this.averageScore = data.averageScore
    this.members = data.members
    this.evaluations = data.evaluations
  }
}