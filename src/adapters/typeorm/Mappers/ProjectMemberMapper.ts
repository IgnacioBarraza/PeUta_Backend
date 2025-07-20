import { ProjectMemberEntity } from '../../../core/entities/ProjectMemberEntity'
import { ProjectMember } from '../schema/ProjectMember'
import { ProjectMapper } from './ProjectMapper'

export const ProjectMemberMapper = {
  toDomain(raw: ProjectMember): ProjectMemberEntity {
    return new ProjectMemberEntity({
      id: raw.id,
      project: ProjectMapper.toDomain(raw.project),
      full_name: raw.full_name,
    })
  },
  toSchema(raw: ProjectMemberEntity): ProjectMember {
    const projectMember = new ProjectMember()
    projectMember.id = raw.id
    projectMember.project = ProjectMapper.toSchema(raw.project)
    projectMember.full_name = raw.full_name
    return projectMember
  },
}
