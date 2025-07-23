import { EvaluationQuestionEntity } from '../../../core/entities/EvaluationQuestionEntity'
import { EvaluationQuestion } from '../schema/EvaluationQuestion'
import { EvaluationFormMapper } from './EvaluationFormMapper'

export const EvaluationQuestionMapper = {
  toDomain(raw: EvaluationQuestion): EvaluationQuestionEntity {
    return new EvaluationQuestionEntity({
      id: raw.id,
      form: raw.form ? EvaluationFormMapper.toDomain(raw.form) : undefined,
      question: raw.question,
      weight: raw.weight,
      order: raw.order,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: EvaluationQuestionEntity): EvaluationQuestion {
    const evaluationQuestion = new EvaluationQuestion()
    evaluationQuestion.id = raw.id
    evaluationQuestion.form = raw.form
      ? EvaluationFormMapper.toSchema(raw.form)
      : undefined
    evaluationQuestion.question = raw.question
    evaluationQuestion.weight = raw.weight
    evaluationQuestion.order = raw.order
    evaluationQuestion.created_at = raw.created_at
    evaluationQuestion.updated_at = raw.updated_at
    return evaluationQuestion
  },
}
