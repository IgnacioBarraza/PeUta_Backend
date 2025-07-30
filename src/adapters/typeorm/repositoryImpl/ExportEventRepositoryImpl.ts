import { Between, DataSource, Repository } from 'typeorm'
import { ExportEventRepository } from '../../../core/ports/ExportEventRepository'
import { Event } from '../schema/Event'
import { ProjectEvaluation } from '../schema/ProjectEvaluation'
import { User } from '../schema/User'
import { ExportCategoryData } from '../../../core/entities/interfaces/ExportEventInterface'
import { groupByCategoryAndProject } from '../../../utils/processData'

export class ExportEventRepositoryImpl implements ExportEventRepository {
  private db: DataSource
  private eventRepository: Repository<Event>
  private evaluationRepository: Repository<ProjectEvaluation>
  private userRepository: Repository<User>

  constructor(db: DataSource) {
    this.db = db
    this.eventRepository = this.db.getRepository(Event)
    this.evaluationRepository = this.db.getRepository(ProjectEvaluation)
    this.userRepository = this.db.getRepository(User)
  }

  async getEvaluationExportData(
    eventId: string,
    from?: string,
    to?: string
  ): Promise<ExportCategoryData[]> {
    const query = this.evaluationRepository
      .createQueryBuilder('evaluation')
      .innerJoinAndSelect('evaluation.project', 'project')
      .innerJoinAndSelect('project.category', 'category')
      .innerJoinAndSelect('evaluation.answers', 'answers')
      .innerJoinAndSelect('answers.question', 'question')
      .where('project.event_id = :eventId', { eventId })

    if (from && to) {
      query.andWhere('eval.created_at BETWEEN :from AND :to', { from, to })
    }

    const evaluations = await query.getMany()

    // Aquí deberías agrupar y procesar las evaluaciones
    return groupByCategoryAndProject(evaluations)
  }

  async getMetricsForExport(eventId: string, from?: string, to?: string) {
    const [userCount, evaluationCount, generalAverage, categoryAverages] =
      await Promise.all([
        this.userRepository.count({
          where:
            from && to
              ? { created_at: Between(new Date(from), new Date(to)) }
              : {},
        }),
        this.evaluationRepository
          .createQueryBuilder('e')
          .innerJoin('e.project', 'p')
          .where('p.event_id = :eventId', { eventId })
          .andWhere(from && to ? 'e.created_at BETWEEN :from AND :to' : '1=1', {
            from,
            to,
          })
          .getCount(),
        this.evaluationRepository
          .createQueryBuilder('e')
          .select('AVG(e.final_score)', 'avg')
          .innerJoin('e.project', 'p')
          .where('p.event_id = :eventId', { eventId })
          .getRawOne(),
        this.evaluationRepository
          .createQueryBuilder('e')
          .select('c.name', 'category')
          .addSelect('AVG(e.final_score)', 'avg')
          .innerJoin('e.project', 'p')
          .innerJoin('p.category', 'c')
          .where('p.event_id = :eventId', { eventId })
          .groupBy('c.name')
          .getRawMany(),
      ])

    return {
      users: userCount,
      evaluations: evaluationCount,
      eventAverage: Number(generalAverage?.avg || 0),
      categoryAverages: categoryAverages.map(c => ({
        name: c.category,
        average: Number(c.avg),
      })),
    }
  }
}
