import { DataSource, Repository } from 'typeorm'
import { ProjectRepository } from '../../../core/ports/ProjectRepository'
import { Project } from '../schema/Project'
import { ProjectEntity } from '../../../core/entities/ProjectEntity'
import { ProjectMapper } from '../Mappers/ProjectMapper'

export class ProjectRepositoryImpl implements ProjectRepository {
  private db: DataSource
  private projectRepository: Repository<Project>

  constructor(db: DataSource) {
    this.db = db
    this.projectRepository = this.db.getRepository(Project)
  }

  async getAllProjects(api_key: string): Promise<ProjectEntity[]> {
    const projects = await this.projectRepository.find({
      relations: {
        category: true,
        members: true,
        // evaluations: true,
      },
      where: {
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })

    return projects.map(project => ProjectMapper.toDomain(project))
  }

  async getProjectById(
    id: string,
    api_key: string
  ): Promise<ProjectEntity | null> {
    const project = await this.projectRepository.findOne({
      relations: {
        event: {
          client: true,
        },
        category: true,
        members: true,
        evaluations: true,
      },
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })

    return project ? ProjectMapper.toDomain(project) : null
  }

  async getProjectsByEvent(
    eventId: string,
    api_key: string
  ): Promise<ProjectEntity[]> {
    const projects = await this.projectRepository.find({
      relations: {
        event: {
          client: true,
        },
        category: true,
        members: true,
        evaluations: true,
      },
      where: {
        event: {
          id: eventId,
          client: {
            api_key,
          },
        },
      },
    })

    return projects.map(project => ProjectMapper.toDomain(project))
  }

  async createProject(project: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const newProject = this.projectRepository.create(project)

    const savedProject = await this.projectRepository.save(newProject)

    return ProjectMapper.toDomain(savedProject)
  }

  async updateProject(
    id: string,
    api_key: string,
    project: Partial<ProjectEntity>
  ): Promise<ProjectEntity | null> {
    const existingProject = await this.projectRepository.findOne({
      where: {
        id,
        event: {
          client: {
            api_key,
          },
        },
      },
    })

    if (!existingProject) return null

    await this.projectRepository.update(id, project)

    return await this.getProjectById(id, api_key)
  }

  async deleteProject(id: string, api_key: string): Promise<boolean> {
    const existingProject = await this.projectRepository.findOne({
      where: {
        id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })

    if (!existingProject) return false

    await this.projectRepository.delete(id)
    return true
  }
}
