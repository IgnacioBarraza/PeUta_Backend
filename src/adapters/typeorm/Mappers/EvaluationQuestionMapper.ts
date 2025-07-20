import { EvaluationQuestionEntity } from '../../../core/entities/EvaluationQuestionEntity'
import { EvaluationQuestion } from '../schema/EvaluationQuestion'
import { EvaluationFormMapper } from './EvaluationFormMapper'

export const EvaluationQuestionMapper = {
  toDomain(raw: EvaluationQuestion): EvaluationQuestionEntity {
    return new EvaluationQuestionEntity({
      id: raw.id,
      form: EvaluationFormMapper.toDomain(raw.form),
      question: raw.question,
      weigth: raw.weigth,
      order: raw.order,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    })
  },
  toSchema(raw: EvaluationQuestionEntity): EvaluationQuestion {
    const evaluationQuestion = new EvaluationQuestion()
    evaluationQuestion.id = raw.id
    evaluationQuestion.form = EvaluationFormMapper.toSchema(raw.form)
    evaluationQuestion.question = raw.question
    evaluationQuestion.weigth = raw.weigth
    evaluationQuestion.order = raw.order
    evaluationQuestion.created_at = raw.created_at
    evaluationQuestion.updated_at = raw.updated_at
    return evaluationQuestion
  },
}
