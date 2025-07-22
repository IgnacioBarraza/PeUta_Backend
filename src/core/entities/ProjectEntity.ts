import { CategoryEntity } from './CategoryEntity'
import { EventEntity } from './EventEntity'
import { ProjectEvaluationEntity } from './ProjectEvaluationEntity'
import { ProjectMemberEntity } from './ProjectMemberEntity'

export class ProjectEntity {
  id: string
  title: string
  description: string
  image_url: string
  members?: ProjectMemberEntity[]
  category?: CategoryEntity
  event?: EventEntity
  evaluations?: ProjectEvaluationEntity[]
  created_at: Date
  updated_at: Date

  constructor(data: ProjectEntity) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.category = data.category
    this.image_url = data.image_url
    this.members = data.members ?? []
    this.event = data.event
    this.evaluations = data.evaluations ?? []
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
