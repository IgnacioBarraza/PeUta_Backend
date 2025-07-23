import { EvaluationQuestionEntity } from '../entities/EvaluationQuestionEntity'

export interface EvaluationQuestionRepository {
  getAllQuestions(api_key: string): Promise<EvaluationQuestionEntity[]>
  getQuestionById(
    api_key: string,
    id: string
  ): Promise<EvaluationQuestionEntity | null>
  createQuestion(
    question: Partial<EvaluationQuestionEntity>
  ): Promise<EvaluationQuestionEntity | null>
  updateQuestion(
    api_key: string,
    id: string,
    question: Partial<EvaluationQuestionEntity>
  ): Promise<EvaluationQuestionEntity | null>
  deleteQuestion(api_key: string, id: string): Promise<boolean>
}
