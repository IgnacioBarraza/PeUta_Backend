import { EvaluationEntity } from './EvaluationEntity'
import { ProjectCategoryEntity } from './ProjectCategoriesEntity'

export class ProjectEntity {
  uid: string
  projectName: string
  description: string
  category: ProjectCategoryEntity
  imageUrl: string
  averageScore: number
  members: { name: string; lastName: string }[]
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
