import { EvaluationAnswerEntity } from '../../../core/entities/EvaluationAnswerEntity'
import { EvaluationAnswer } from '../schema/EvaluationAnswer'
import { EvaluationQuestionMapper } from './EvaluationQuestionMapper'
import { ProjectEvaluationMapper } from './ProjectEvaluationMapper'

export const EvaluationAnswerMapper = {
  toDomain(raw: EvaluationAnswer): EvaluationAnswerEntity {
    return new EvaluationAnswerEntity({
      id: raw.id,
      evaluation: ProjectEvaluationMapper.toDomain(raw.evaluation),
      question: EvaluationQuestionMapper.toDomain(raw.question),
      score: raw.score,
      comment: raw.comment,
    })
  },
  toSchema(raw: EvaluationAnswerEntity): EvaluationAnswer {
    const evaluationAnswer = new EvaluationAnswer()
    evaluationAnswer.id = raw.id
    evaluationAnswer.evaluation = ProjectEvaluationMapper.toSchema(
      raw.evaluation
    )
    evaluationAnswer.question = EvaluationQuestionMapper.toSchema(raw.question)
    evaluationAnswer.score = raw.score
    evaluationAnswer.comment = raw.comment
    return evaluationAnswer
  },
}
