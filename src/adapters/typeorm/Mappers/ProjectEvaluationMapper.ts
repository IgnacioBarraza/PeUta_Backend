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
      project: raw.project ? ProjectMapper.toDomain(raw.project) : undefined,
      evaluator: UserMapper.toDomain(raw.evaluator),
      form: raw.form ? EvaluationFormMapper.toDomain(raw.form) : undefined,
      final_score: raw.final_score,
      answers: raw.answers?.map(EvaluationAnswerMapper.toDomain) ?? [],
      comment: raw.comment ?? undefined,
      created_at: raw.created_at,
    })
  },
  toSchema(raw: ProjectEvaluationEntity): ProjectEvaluation {
    const projectEvaluation = new ProjectEvaluation()
    projectEvaluation.id = raw.id
    projectEvaluation.project = raw.project
      ? ProjectMapper.toSchema(raw.project)
      : undefined
    projectEvaluation.evaluator = UserMapper.toSchema(raw.evaluator)
    projectEvaluation.form = raw.form
      ? EvaluationFormMapper.toSchema(raw.form)
      : undefined
    projectEvaluation.final_score = raw.final_score
    projectEvaluation.answers =
      raw.answers?.map(EvaluationAnswerMapper.toSchema) ?? []
    projectEvaluation.comment = raw.comment ?? undefined
    projectEvaluation.created_at = raw.created_at
    return projectEvaluation
  },
}
