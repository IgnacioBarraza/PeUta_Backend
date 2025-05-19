import { EvaluationQuestionEntity } from './EvalutionQuestionEntity'
import { ProjectEntity } from './ProjectEntity'

export class ProjectCategoryEntity {
  uid: string
  name: string
  description: string
  questions: EvaluationQuestionEntity[]
  project: ProjectEntity[]

  constructor(data: ProjectCategoryEntity) {
    this.uid = data.uid
    this.name = data.name
    this.description = data.description
    this.questions = data.questions
    this.project = data.project
  }
}
