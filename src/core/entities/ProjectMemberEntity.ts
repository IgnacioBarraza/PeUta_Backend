import { ProjectEntity } from './ProjectEntity'

export class ProjectMemberEntity {
  id: string
  project?: ProjectEntity
  full_name: string

  constructor(data: ProjectMemberEntity) {
    this.id = data.id
    this.project = data.project
    this.full_name = data.full_name
  }
}
