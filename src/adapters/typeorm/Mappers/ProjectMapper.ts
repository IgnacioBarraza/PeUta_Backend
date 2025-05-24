import { ProjectEntity } from '../../../core/entities/ProjectEntity'
import { Project } from '../schema/Project'
import { CategoryMapper } from './CategoryMapper'
import { EvaluationMapper } from './EvaluationMapper'

export const ProjectMapper = {
  toDomain(raw: Project): ProjectEntity {
    return new ProjectEntity({
      uid: raw.uid,
      projectName: raw.projectName,
      description: raw.description,
      category: CategoryMapper.toDomain(raw.category),
      imageUrl: raw.imageUrl,
      averageScore: raw.averageScore ? raw.averageScore : 0,
      members: raw.members.map(m => m),
      evaluations: raw.evaluations.map(EvaluationMapper.toDomain),
    })
  },
  toSchema(raw: ProjectEntity): Project {
    const project = new Project()
    project.uid = raw.uid
    project.projectName = raw.projectName
    project.description = raw.description
    project.category = CategoryMapper.toSchema(raw.category)
    project.imageUrl = raw.imageUrl
    project.averageScore = raw.averageScore
    project.members = raw.members.map(m => m)
    project.evaluations = raw.evaluations.map(EvaluationMapper.toSchema)

    return project
  },
}
