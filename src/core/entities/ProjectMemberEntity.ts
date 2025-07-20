export class ProjectMemberEntity {
  id: string
  project_id: string
  full_name: string

  constructor(data: ProjectMemberEntity) {
    this.id = data.id
    this.project_id = data.project_id
    this.full_name = data.full_name
  }
}
