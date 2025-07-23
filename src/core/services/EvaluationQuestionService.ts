import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { getTotalWeightForForm } from '../../utils/processData'
import { EvaluationQuestionEntity } from '../entities/EvaluationQuestionEntity'
import { EvaluationFormRepository } from '../ports/EvaluationFormRepository'
import { EvaluationQuestionRepository } from '../ports/EvaluationQuestionRepository'
import {
  CreateEvaluationQuestionSchema,
  UpdateEvaluationQuestionSchema,
} from '../validations/EvaluationQuestionValidation'

export class EvaluationQuestionService {
  constructor(
    private questionRepository: EvaluationQuestionRepository,
    private formRepository: EvaluationFormRepository
  ) {}

  async getAllQuestions(api_key: string): Promise<EvaluationQuestionEntity[]> {
    const questions = await this.questionRepository.getAllQuestions(api_key)

    if (questions.length === 0)
      throw new CustomError('Questions not found', 404, ['Questions not found'])

    return questions
  }

  async getQuestionById(
    api_key: string,
    id: string
  ): Promise<EvaluationQuestionEntity> {
    const question = await this.questionRepository.getQuestionById(api_key, id)
    if (!question)
      throw new CustomError('Question not found', 404, ['Question not found'])
    return question
  }

  async createQuestion(
    api_key: string,
    question: Partial<EvaluationQuestionEntity>
  ): Promise<EvaluationQuestionEntity> {
    const parsedData =
      CreateEvaluationQuestionSchema.strict().safeParse(question)
    if (!parsedData.success) {
      throw new CustomError('Invalid data', 400, parsedData.error)
    }
    const data = parsedData.data

    const form = await this.formRepository.getEvaluationFormById(
      api_key,
      data.form_id
    )
    if (!form) throw new CustomError('Form not found', 404, ['Form not found'])

    const questions = form.questions || []
    const currentTotal = getTotalWeightForForm(questions.map(q => q.weight))
    const proposedTotal = currentTotal + data.weight

    if (proposedTotal > 1)
      throw new CustomError(
        `Invalid weight. Total weight exceeds 100%. Current total: ${currentTotal.toFixed(
          2
        )}, new: ${data.weight.toFixed(2)}, sum: ${proposedTotal.toFixed(2)}`,
        400,
        [
          `Total weight exceeds 100%. Current total: ${currentTotal.toFixed(
            2
          )}, new: ${data.weight.toFixed(2)}, sum: ${proposedTotal.toFixed(2)}`,
        ]
      )

    const createdQuestion = await this.questionRepository.createQuestion({
      ...data,
      form: form,
    })

    if (!createdQuestion)
      throw new CustomError('Question not created', 500, [
        'Question not created',
      ])

    return createdQuestion
  }

  async updateQuestion(
    api_key: string,
    id: string,
    question: Partial<EvaluationQuestionEntity>
  ): Promise<EvaluationQuestionEntity> {
    const parsedData =
      UpdateEvaluationQuestionSchema.strict().safeParse(question)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error.errors)

    const data = parsedData.data

    // Si se está actualizando el weight, validar el total
    if (data.weight !== undefined) {
      const currentQuestion = await this.questionRepository.getQuestionById(
        api_key,
        id
      )
      if (!currentQuestion) {
        throw new CustomError('Question not found', 404, ['Question not found'])
      }

      const form = await this.formRepository.getEvaluationFormById(
        api_key,
        currentQuestion.form!.id
      )
      if (!form)
        throw new CustomError('Form not found', 404, ['Form not found'])

      const questions = form.questions || []
      const currentTotal = getTotalWeightForForm(
        questions.filter(q => q.id !== id).map(q => q.weight)
      )
      const proposedTotal = currentTotal + data.weight

      if (proposedTotal > 1)
        throw new CustomError(
          `Invalid weight. Total weight exceeds 100%. Current total: ${currentTotal.toFixed(
            2
          )}, new: ${data.weight.toFixed(2)}, sum: ${proposedTotal.toFixed(2)}`,
          400,
          [
            `Total weight exceeds 100%. Current total: ${currentTotal.toFixed(
              2
            )}, new: ${data.weight.toFixed(2)}, sum: ${proposedTotal.toFixed(2)}`,
          ]
        )
    }

    const updatedQuestion = await this.questionRepository.updateQuestion(
      api_key,
      id,
      data
    )
    if (!updatedQuestion)
      throw new CustomError('Question not updated', 500, [
        'Question not updated',
      ])

    return updatedQuestion
  }

  async deleteQuestion(api_key: string, id: string): Promise<boolean> {
    const deleted = await this.questionRepository.deleteQuestion(api_key, id)
    if (!deleted)
      throw new CustomError('Question not deleted', 500, [
        'Question not deleted',
      ])

    return deleted
  }
}
