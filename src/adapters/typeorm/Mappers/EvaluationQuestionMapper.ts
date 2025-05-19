import { EvaluationQuestionEntity } from '../../../core/entities/EvalutionQuestionEntity'
import { EvaluationQuestions } from '../schema/EvaluationQuestions'
import { CategoryMapper } from './CategoryMapper'
import { EvaluationScoreMapper } from './EvaluationScoreMapper'

export const EvaluationQuestionMapper = {
  toDomain(raw: EvaluationQuestions): EvaluationQuestionEntity {
    return new EvaluationQuestionEntity({
      uid: raw.uid,
      weight: raw.weight,
      question: raw.question,
      minScore: raw.minScore,
      maxScore: raw.maxScore,
      categories: raw.categories.map(CategoryMapper.toDomain),
      evaluationScores: EvaluationScoreMapper.toDomain(raw.evaluationScores),
    })
  },
  toSchema(raw: EvaluationQuestionEntity): EvaluationQuestions {
    const question = new EvaluationQuestions()
    question.uid = raw.uid
    question.weight = raw.weight
    question.question = raw.question
    question.minScore = raw.minScore
    question.maxScore = raw.maxScore
    question.categories = raw.categories.map(CategoryMapper.toSchema)
    question.evaluationScores = EvaluationScoreMapper.toSchema(
      raw.evaluationScores
    )

    return question
  },
}
