import { DataSource, Repository } from 'typeorm'
import { EvaluationAnswerRepository } from '../../../core/ports/EvaluationAnswerRepository'
import { EvaluationAnswer } from '../schema/EvaluationAnswer'
import { EvaluationAnswerEntity } from '../../../core/entities/EvaluationAnswerEntity'
import { EvaluationAnswerMapper } from '../Mappers/EvaluationAnswerMapper'

export class EvaluationAnswerRepositoryImpl
  implements EvaluationAnswerRepository
{
  private db: DataSource
  private answerRepository: Repository<EvaluationAnswer>

  constructor(db: DataSource) {
    this.db = db
    this.answerRepository = db.getRepository(EvaluationAnswer)
  }

  async createAnswer(
    answer: Partial<EvaluationAnswerEntity>
  ): Promise<EvaluationAnswerEntity | null> {
    const newAnswer = this.answerRepository.create(answer)
    const savedAnswer = await this.answerRepository.save(newAnswer)
    return EvaluationAnswerMapper.toDomain(savedAnswer)
  }

  async getAnswerById(
    api_key: string,
    id: string
  ): Promise<EvaluationAnswerEntity | null> {
    const answer = await this.answerRepository.findOne({
      where: {
        id: id,
        evaluation: {
          form: {
            event: {
              client: {
                api_key: api_key,
              },
            },
          },
        },
      },
    })

    return answer ? EvaluationAnswerMapper.toDomain(answer) : null
  }

  async getAllAnswers(api_key: string): Promise<EvaluationAnswerEntity[]> {
    const answers = await this.answerRepository.find({
      where: {
        evaluation: {
          form: {
            event: {
              client: {
                api_key: api_key,
              },
            },
          },
        },
      },
    })

    return answers.map(answer => EvaluationAnswerMapper.toDomain(answer))
  }

  async deleteAnswer(api_key: string, id: string): Promise<boolean> {
    const answer = await this.getAnswerById(api_key, id)

    if (!answer) return false

    await this.answerRepository.delete(id)
    return true
  }
}
