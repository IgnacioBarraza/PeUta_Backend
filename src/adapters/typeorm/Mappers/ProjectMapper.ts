import { ProjectEntity } from '../../../core/entities/ProjectEntity'
import { Project } from '../schema/Project'
import { CategoryMapper } from './CategoryMapper'
import { EventMapper } from './EventMapper'
import { ProjectEvaluationMapper } from './ProjectEvaluationMapper'
import { ProjectMemberMapper } from './ProjectMemberMapper'

export const ProjectMapper = {
  toDomain(raw: Project): ProjectEntity {
    return new ProjectEntity({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      image_url: raw.image_url,
      members: raw.members?.map(ProjectMemberMapper.toDomain) ?? [],
      category: CategoryMapper.toDomain(raw.category),
      event: EventMapper.toDomain(raw.event),
      evaluations: raw.evaluations?.map(ProjectEvaluationMapper.toDomain) ?? [],
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: ProjectEntity): Project {
    const project = new Project()
    project.id = raw.id
    project.title = raw.title
    project.description = raw.description
    project.category = CategoryMapper.toSchema(raw.category)
    project.image_url = raw.image_url
    project.members = raw.members?.map(ProjectMemberMapper.toSchema) ?? []
    project.event = EventMapper.toSchema(raw.event)
    project.evaluations =
      raw.evaluations?.map(ProjectEvaluationMapper.toSchema) ?? []
    project.created_at = raw.created_at
    project.updated_at = raw.updated_at

    return project
  },
}
