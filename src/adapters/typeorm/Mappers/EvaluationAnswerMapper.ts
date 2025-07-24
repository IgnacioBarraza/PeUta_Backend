import { EvaluationAnswerEntity } from '../../../core/entities/EvaluationAnswerEntity'
import { EvaluationAnswer } from '../schema/EvaluationAnswer'
import { EvaluationQuestionMapper } from './EvaluationQuestionMapper'
import { ProjectEvaluationMapper } from './ProjectEvaluationMapper'

export const EvaluationAnswerMapper = {
  toDomain(raw: EvaluationAnswer): EvaluationAnswerEntity {
    return new EvaluationAnswerEntity({
      id: raw.id,
      evaluation: raw.evaluation
        ? ProjectEvaluationMapper.toDomain(raw.evaluation)
        : undefined,
      question: EvaluationQuestionMapper.toDomain(raw.question),
      score: raw.score,
    })
  },
  toSchema(raw: EvaluationAnswerEntity): EvaluationAnswer {
    const evaluationAnswer = new EvaluationAnswer()
    evaluationAnswer.id = raw.id
    evaluationAnswer.evaluation = raw.evaluation
      ? ProjectEvaluationMapper.toSchema(raw.evaluation)
      : undefined
    evaluationAnswer.question = EvaluationQuestionMapper.toSchema(raw.question)
    evaluationAnswer.score = raw.score
    return evaluationAnswer
  },
}
