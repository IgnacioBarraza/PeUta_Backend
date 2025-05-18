import { EvaluationQuestionEntity } from "./EvalutionQuestionEntity"

export class ProjectCategoryEntity {
  uid: string
  name: string
  description: string
  questions: EvaluationQuestionEntity[]

  constructor(data: ProjectCategoryEntity) {
    this.uid = data.uid
    this.name = data.name
    this.description = data.description
    this.questions = data.questions
  }
}