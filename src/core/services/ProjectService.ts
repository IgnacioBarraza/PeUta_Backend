import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { ProjectEntity } from '../entities/ProjectEntity'
import { CategoryRepository } from '../ports/CategoryRepository'
import { EventRepository } from '../ports/EventRepository'
import { ProjectRepository } from '../ports/ProjectRepository'
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from '../validations/ProjectValidation'

export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private eventRepository: EventRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async getAllProjects(api_key: string): Promise<ProjectEntity[]> {
    const projects = await this.projectRepository.getAllProjects(api_key)
    if (projects.length === 0)
      throw new CustomError('No projects found', 404, ['No projects found'])
    return projects
  }

  async getProjectById(
    api_key: string,
    projectId: string
  ): Promise<ProjectEntity> {
    const project = await this.projectRepository.getProjectById(
      projectId,
      api_key
    )
    if (!project)
      throw new CustomError('Project not found', 404, ['Project not found'])
    return project
  }

  async getProjectsByEvent(
    eventId: string,
    api_key: string
  ): Promise<ProjectEntity[]> {
    const projects = await this.projectRepository.getProjectsByEvent(
      eventId,
      api_key
    )
    if (projects.length === 0)
      throw new CustomError('No projects found', 404, ['No projects found'])
    return projects
  }

  async createProject(
    project: Partial<ProjectEntity>,
    api_key: string
  ): Promise<ProjectEntity> {
    const parsedData = CreateProjectSchema.strict().safeParse(project)
    if (!parsedData.success)
      throw new CustomError('Validation Error', 400, parsedData.error)

    const data = parsedData.data

    const category = await this.categoryRepository.getCategoryById(
      api_key,
      data.category_id
    )
    if (!category)
      throw new CustomError('Category not found', 404, ['Category not found'])

    const event = await this.eventRepository.getEventByIdAndApikey(
      data.event_id,
      api_key
    )
    if (!event)
      throw new CustomError('Event not found', 404, ['Event not found'])

    const newProject = await this.projectRepository.createProject(
      {
        ...data,
        category: category,
        event: event,
      },
      api_key
    )

    if (!newProject)
      throw new CustomError('Project not created', 500, ['Project not created'])

    return newProject
  }

  async updateProject(
    id: string,
    api_key: string,
    project: Partial<ProjectEntity>
  ): Promise<ProjectEntity> {
    const parsedData = UpdateProjectSchema.strict().safeParse(project)
    if (!parsedData.success)
      throw new CustomError('Validation Error', 400, parsedData.error)

    const data = parsedData.data

    const updatePayload: Partial<ProjectEntity> = {}

    if (data.category_id) {
      const category = await this.categoryRepository.getCategoryById(
        api_key,
        data.category_id
      )
      if (!category)
        throw new CustomError('Category not found', 404, ['Category not found'])
      updatePayload.category = category
    }

    if (data.event_id) {
      const event = await this.eventRepository.getEventByIdAndApikey(
        api_key,
        data.event_id
      )
      if (!event)
        throw new CustomError('Event not found', 404, ['Event not found'])
      updatePayload.event = event
    }

    if (data.title) updatePayload.title = data.title
    if (data.description) updatePayload.description = data.description

    const updated = await this.projectRepository.updateProject(
      id,
      api_key,
      updatePayload
    )

    if (!updated)
      throw new CustomError('Project not updated', 500, ['Project not updated'])

    return updated
  }

  async deleteProject(id: string, api_key: string): Promise<boolean> {
    const deleted = await this.projectRepository.deleteProject(id, api_key)

    if (!deleted)
      throw new CustomError('Project not deleted', 500, ['Project not deleted'])

    return deleted
  }
}
