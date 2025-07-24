import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { EvaluationAnswerEntity } from '../entities/EvaluationAnswerEntity'
import { EvaluationAnswerRepository } from '../ports/EvaluationAnswerRepository'
import { CreateEvaluationAnswerSchema } from '../validations/EvaluationAnswerValidation'

export class EvaluationAnswerService {
  constructor(private answerRepository: EvaluationAnswerRepository) {}

  async getAnswerById(
    api_key: string,
    id: string
  ): Promise<EvaluationAnswerEntity> {
    const answer = await this.answerRepository.getAnswerById(api_key, id)

    if (!answer)
      throw new CustomError('Answer not found', 404, ['Answer not found'])

    return answer
  }

  async getAllAnswers(api_key: string): Promise<EvaluationAnswerEntity[]> {
    const answers = await this.answerRepository.getAllAnswers(api_key)

    if (answers.length === 0)
      throw new CustomError('Answers not found', 404, ['Answers not found'])

    return answers
  }

  async createAnswer(
    answer: Partial<EvaluationAnswerEntity>
  ): Promise<EvaluationAnswerEntity> {
    const parsedData = CreateEvaluationAnswerSchema.strict().safeParse(answer)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const data = parsedData.data

    const newAnswer = await this.answerRepository.createAnswer(data)

    if (!newAnswer)
      throw new CustomError('Answer not created', 400, ['Answer not created'])

    return newAnswer
  }

  async deleteAnswer(api_key: string, id: string): Promise<boolean> {
    const deleted = await this.answerRepository.deleteAnswer(api_key, id)

    if (!deleted)
      throw new CustomError('Answer not deleted', 400, ['Answer not deleted'])

    return deleted
  }
}
