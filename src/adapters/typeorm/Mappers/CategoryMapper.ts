import { ProjectCategoryEntity } from '../../../core/entities/ProjectCategoriesEntity'
import { ProjectCategories } from '../schema/ProjectCategories'
import { EvaluationQuestionMapper } from './EvaluationQuestionMapper'
import { ProjectMapper } from './ProjectMapper'

export const CategoryMapper = {
  toDomain(raw: ProjectCategories): ProjectCategoryEntity {
    return new ProjectCategoryEntity({
      uid: raw.uid,
      name: raw.name,
      description: raw.description,
      questions: raw.questions.map(EvaluationQuestionMapper.toDomain),
      project: raw.project.map(ProjectMapper.toDomain),
    })
  },
  toSchema(raw: ProjectCategoryEntity): ProjectCategories {
    const category = new ProjectCategories()
    category.uid = raw.uid
    category.name = raw.uid
    category.description = raw.uid
    category.questions = raw.questions.map(EvaluationQuestionMapper.toSchema)
    category.project = raw.project.map(ProjectMapper.toSchema)

    return category
  },
}
