import { DataSource, Repository } from 'typeorm'
import { ProjectEvaluationRepository } from '../../../core/ports/ProjectEvaluationRepository'
import { ProjectEvaluation } from '../schema/ProjectEvaluation'
import { ProjectEvaluationEntity } from '../../../core/entities/ProjectEvaluationEntity'
import { ProjectEvaluationMapper } from '../Mappers/ProjectEvaluationMapper'

export class ProjectEvaluationRepositoryImpl
  implements ProjectEvaluationRepository
{
  private db: DataSource
  private evaluationRepository: Repository<ProjectEvaluation>

  constructor(db: DataSource) {
    this.db = db
    this.evaluationRepository = this.db.getRepository(ProjectEvaluation)
  }

  async getEvaluationById(
    api_key: string,
    id: string
  ): Promise<ProjectEvaluationEntity | null> {
    const evaluation = await this.evaluationRepository.findOne({
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
      relations: {
        evaluator: true,
        answers: true,
      },
    })

    return evaluation ? ProjectEvaluationMapper.toDomain(evaluation) : null
  }

  async getEvaluationsByProject(
    api_key: string,
    project_id: string
  ): Promise<ProjectEvaluationEntity[]> {
    const evaluations = await this.evaluationRepository.find({
      where: {
        form: {
          event: {
            client: {
              api_key: api_key,
            },
            projects: {
              id: project_id,
            },
          },
        },
      },
      relations: {
        evaluator: true,
        answers: true,
      },
    })

    return evaluations.map(evaluation =>
      ProjectEvaluationMapper.toDomain(evaluation)
    )
  }

  async getEvaluatedProjectsByUser(
    api_key: string,
    user_id: string,
    event_id: string
  ): Promise<ProjectEvaluationEntity[]> {
    const evaluations = await this.evaluationRepository.find({
      where: {
        evaluator: {
          id: user_id,
        },
        form: {
          event: {
            id: event_id,
            client: {
              api_key: api_key,
            },
          },
        },
      },
      relations: {
        evaluator: true,
        answers: true,
      },
    })

    return evaluations.map(evaluation =>
      ProjectEvaluationMapper.toDomain(evaluation)
    )
  }

  async createEvaluation(
    evaluation: Partial<ProjectEvaluationEntity>
  ): Promise<ProjectEvaluationEntity | null> {
    const newEvaluation = this.evaluationRepository.create(evaluation)
    const savedEvaluation = await this.evaluationRepository.save(newEvaluation)
    return ProjectEvaluationMapper.toDomain(savedEvaluation)
  }

  async deleteEvaluation(api_key: string, id: string): Promise<boolean> {
    const evaluation = await this.evaluationRepository.findOne({
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

    if (!evaluation) return false

    await this.evaluationRepository.delete(id)
    return true
  }

  async hasUserEvaluatedProject(
    api_key: string,
    user_id: string,
    project_id: string
  ): Promise<boolean> {
    const evaluation = await this.evaluationRepository.findOne({
      where: {
        evaluator: {
          id: user_id,
        },
        project: {
          id: project_id,
        },
        form: {
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    return !!evaluation
  }
}
