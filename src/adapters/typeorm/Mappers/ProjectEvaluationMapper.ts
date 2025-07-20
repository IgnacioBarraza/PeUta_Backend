import { ProjectEvaluationEntity } from '../../../core/entities/ProjectEvaluationEntity'
import { ProjectEvaluation } from '../schema/ProjectEvaluation'
import { EvaluationAnswerMapper } from './EvaluationAnswerMapper'
import { EvaluationFormMapper } from './EvaluationFormMapper'
import { ProjectMapper } from './ProjectMapper'
import { UserMapper } from './UserMapper'

export const ProjectEvaluationMapper = {
  toDomain(raw: ProjectEvaluation): ProjectEvaluationEntity {
    return new ProjectEvaluationEntity({
      id: raw.id,
      project: ProjectMapper.toDomain(raw.project),
      evaluator: UserMapper.toDomain(raw.evaluator),
      form: EvaluationFormMapper.toDomain(raw.form),
      final_score: raw.final_score,
      answers: raw.answers.map(EvaluationAnswerMapper.toDomain),
      created_at: raw.created_at,
    })
  },
  toSchema(raw: ProjectEvaluationEntity): ProjectEvaluation {
    const projectEvaluation = new ProjectEvaluation()
    projectEvaluation.id = raw.id
    projectEvaluation.project = ProjectMapper.toSchema(raw.project)
    projectEvaluation.evaluator = UserMapper.toSchema(raw.evaluator)
    projectEvaluation.form = EvaluationFormMapper.toSchema(raw.form)
    projectEvaluation.final_score = raw.final_score
    projectEvaluation.answers = raw.answers.map(EvaluationAnswerMapper.toSchema)
    projectEvaluation.created_at = raw.created_at
    return projectEvaluation
  },
}
