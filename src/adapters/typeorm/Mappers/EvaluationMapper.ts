import { EvaluationEntity } from '../../../core/entities/EvaluationEntity'
import { Evaluations } from '../schema/Evaluations'
import { EvaluationScoreMapper } from './EvaluationScoreMapper'
import { ProjectMapper } from './ProjectMapper'
import { UserMapper } from './UserMapper'

export const EvaluationMapper = {
  toDomain(raw: Evaluations): EvaluationEntity {
    return new EvaluationEntity({
      uid: raw.uid,
      finalScore: raw.finalScore,
      createdAt: raw.createdAt,
      user: UserMapper.toDomain(raw.user),
      project: ProjectMapper.toDomain(raw.project),
      evaluationScores: raw.evaluationScores?.map(
        EvaluationScoreMapper.toDomain
      ),
    })
  },
  toSchema(raw: EvaluationEntity): Evaluations {
    const evaluation = new Evaluations()
    evaluation.uid = raw.uid
    evaluation.finalScore = raw.finalScore
    evaluation.createdAt = raw.createdAt
    evaluation.project = ProjectMapper.toSchema(raw.project)
    evaluation.evaluationScores = raw.evaluationScores.map(
      EvaluationScoreMapper.toSchema
    )

    return evaluation
  },
}
