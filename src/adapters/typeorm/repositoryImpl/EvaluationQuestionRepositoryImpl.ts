import { DataSource, Repository } from 'typeorm'
import { EvaluationQuestionRepository } from '../../../core/ports/EvaluationQuestionRepository'
import { EvaluationQuestion } from '../schema/EvaluationQuestion'
import { EvaluationQuestionEntity } from '../../../core/entities/EvaluationQuestionEntity'
import { EvaluationQuestionMapper } from '../Mappers/EvaluationQuestionMapper'

export class EvaluationQuestionRepositoryImpl
  implements EvaluationQuestionRepository
{
  private db: DataSource
  private questionRepository: Repository<EvaluationQuestion>

  constructor(db: DataSource) {
    this.db = db
    this.questionRepository = this.db.getRepository(EvaluationQuestion)
  }

  async getAllQuestions(api_key: string): Promise<EvaluationQuestionEntity[]> {
    const questions = await this.questionRepository.find({
      where: {
        form: {
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    return questions.map(q => EvaluationQuestionMapper.toDomain(q))
  }

  async getQuestionById(
    api_key: string,
    id: string
  ): Promise<EvaluationQuestionEntity | null> {
    const question = await this.questionRepository.findOne({
      where: {
        id: id,
        form: {
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    return question ? EvaluationQuestionMapper.toDomain(question) : null
  }

  async createQuestion(
    question: Partial<EvaluationQuestionEntity>
  ): Promise<EvaluationQuestionEntity | null> {
    const newQuestion = this.questionRepository.create(question)
    const savedQuestion = await this.questionRepository.save(newQuestion)
    return EvaluationQuestionMapper.toDomain(savedQuestion)
  }

  async updateQuestion(
    api_key: string,
    id: string,
    question: Partial<EvaluationQuestionEntity>
  ): Promise<EvaluationQuestionEntity | null> {
    const existingQuestion = await this.questionRepository.findOne({
      where: {
        id: id,
        form: {
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    if (!existingQuestion) return null

    await this.questionRepository.update(id, question)
    return await this.getQuestionById(api_key, id)
  }

  async deleteQuestion(api_key: string, id: string): Promise<boolean> {
    const question = await this.questionRepository.findOne({
      where: {
        id: id,
        form: {
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    if (!question) return false

    await this.questionRepository.delete(id)
    return true
  }
}
