import { EvaluationScoreEntity } from '../../../core/entities/EvaluationScoresEntity'
import { EvaluationScores } from '../schema/EvaluationScores'
import { EvaluationMapper } from './EvaluationMapper'
import { EvaluationQuestionMapper } from './EvaluationQuestionMapper'

export const EvaluationScoreMapper = {
  toDomain(raw: EvaluationScores): EvaluationScoreEntity {
    return new EvaluationScoreEntity({
      uid: raw.uid,
      score: raw.score,
      evaluations: EvaluationMapper.toDomain(raw.evaluations),
      questions: EvaluationQuestionMapper.toDomain(raw.questions),
    })
  },
  toSchema(raw: EvaluationScoreEntity): EvaluationScores {
    const score = new EvaluationScores()
    score.uid = raw.uid
    score.score = raw.score
    score.evaluations = EvaluationMapper.toSchema(raw.evaluations)
    score.questions = EvaluationQuestionMapper.toSchema(raw.questions)

    return score
  },
}
