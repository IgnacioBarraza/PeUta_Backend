import { EvaluationAnswerEntity } from './EvaluationAnswerEntity'
import { EvaluationFormEntity } from './EvaluationFormEntity'
import { ProjectEntity } from './ProjectEntity'
import { UserEntity } from './UserEntity'

export class ProjectEvaluationEntity {
  id: string
  project: ProjectEntity
  evaluator: UserEntity
  form: EvaluationFormEntity
  final_score: number
  answers: EvaluationAnswerEntity[]
  created_at: Date

  constructor(data: ProjectEvaluationEntity) {
    this.id = data.id
    this.project = data.project
    this.evaluator = data.evaluator
    this.form = data.form
    this.final_score = data.final_score
    this.answers = data.answers
    this.created_at = data.created_at
  }
}
