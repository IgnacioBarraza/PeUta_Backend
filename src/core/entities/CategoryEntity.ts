import { EventEntity } from './EventEntity'
import { ProjectEntity } from './ProjectEntity'

export class CategoryEntity {
  id: string
  name: string
  description: string
  event: EventEntity
  projects: ProjectEntity[]

  constructor(data: CategoryEntity) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.event = data.event
    this.projects = data.projects
  }
}
