import { DataSource, Repository } from 'typeorm'
import { EvaluationFormEntity } from '../../../core/entities/EvaluationFormEntity'
import { EvaluationForm } from '../schema/EvaluationForm'
import { EvaluationFormRepository } from '../../../core/ports/EvaluationFormRepository'
import { EvaluationFormMapper } from '../Mappers/EvaluationFormMapper'

export class EvaluationFormRepositoryImpl implements EvaluationFormRepository {
  private db: DataSource
  private formRepository: Repository<EvaluationForm>

  constructor(db: DataSource) {
    this.db = db
    this.formRepository = this.db.getRepository(EvaluationForm)
  }

  async getAllEvaluationForm(api_key: string): Promise<EvaluationFormEntity[]> {
    const forms = await this.formRepository.find({
      where: {
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
      relations: {
        questions: true,
      },
    })

    return forms.map(form => EvaluationFormMapper.toDomain(form))
  }

  async getEvaluationFormById(
    api_key: string,
    id: string
  ): Promise<EvaluationFormEntity | null> {
    const form = await this.formRepository.findOne({
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
      relations: {
        questions: true,
      },
    })

    return form ? EvaluationFormMapper.toDomain(form) : null
  }

  async getEvaluationFormByEvent(
    api_key: string,
    eventId: string
  ): Promise<EvaluationFormEntity[]> {
    const forms = await this.formRepository.find({
      where: {
        event: {
          id: eventId,
          client: {
            api_key: api_key,
          },
        },
      },
      relations: {
        questions: true,
      },
    })

    return forms.map(form => EvaluationFormMapper.toDomain(form))
  }

  async createEvaluationForm(
    evaluationForm: Partial<EvaluationFormEntity>
  ): Promise<EvaluationFormEntity | null> {
    const newForm = this.formRepository.create(evaluationForm)
    const savedForm = await this.formRepository.save(newForm)
    return EvaluationFormMapper.toDomain(savedForm)
  }

  async updateEvaluationForm(
    api_key: string,
    id: string,
    evaluationForm: Partial<EvaluationFormEntity>
  ): Promise<EvaluationFormEntity | null> {
    const existingForm = await this.formRepository.findOne({
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })

    if (!existingForm) return null

    await this.formRepository.update(id, evaluationForm)
    return await this.getEvaluationFormById(api_key, id)
  }

  async deleteEvaluationForm(api_key: string, id: string): Promise<boolean> {
    const form = await this.formRepository.findOne({
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })
    if (!form) return false

    await this.formRepository.delete(id)
    return true
  }
}
