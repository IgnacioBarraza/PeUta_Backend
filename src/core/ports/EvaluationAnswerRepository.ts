import { EvaluationAnswerEntity } from '../entities/EvaluationAnswerEntity'

export interface EvaluationAnswerRepository {
  createAnswer(
    answer: Partial<EvaluationAnswerEntity>
  ): Promise<EvaluationAnswerEntity | null>
  getAnswerById(
    api_key: string,
    id: string
  ): Promise<EvaluationAnswerEntity | null>
  getAllAnswers(api_key: string): Promise<EvaluationAnswerEntity[]>
  deleteAnswer(api_key: string, id: string): Promise<boolean>
}
