import { ProjectMemberEntity } from './ProjectMemberEntity'

export class VisitorEntity {
  id: string
  project_member: ProjectMemberEntity
  full_name: string
  institution?: string
  visit_time: Date
  created_at: Date

  constructor(data: VisitorEntity) {
    this.id = data.id
    this.project_member = data.project_member
    this.full_name = data.full_name
    this.institution = data.institution
    this.visit_time = data.visit_time
    this.created_at = data.created_at
  }
}
