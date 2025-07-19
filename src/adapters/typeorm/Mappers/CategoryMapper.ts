import { ProjectCategoryEntity } from '../../../core/entities/ProjectCategoriesEntity'
import { Category } from '../schema/Category'
import { EvaluationQuestionMapper } from './EvaluationQuestionMapper'
import { ProjectMapper } from './ProjectMapper'

export const CategoryMapper = {
  toDomain(raw: Category): ProjectCategoryEntity {
    return new ProjectCategoryEntity({
      uid: raw.id,
      name: raw.name,
      description: raw.description,
      questions: raw.questions.map(EvaluationQuestionMapper.toDomain),
      project: raw.project.map(ProjectMapper.toDomain),
    })
  },
  toSchema(raw: ProjectCategoryEntity): Category {
    const category = new Category()
    category.id = raw.uid
    category.name = raw.uid
    category.description = raw.uid
    // category.questions = raw.questions.map(EvaluationQuestionMapper.toSchema)
    // category.project = raw.project.map(ProjectMapper.toSchema)

    return category
  },
}
