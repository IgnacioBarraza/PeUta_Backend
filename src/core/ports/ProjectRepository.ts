import { ProjectEntity } from '../entities/ProjectEntity'

export interface ProjectRepository {
  getAllProjects(api_key: string): Promise<ProjectEntity[]>
  getProjectById(id: string, api_key: string): Promise<ProjectEntity | null>
  getProjectsByEvent(eventId: string, api_key: string): Promise<ProjectEntity[]>
  createProject(
    project: Partial<ProjectEntity>,
    api_key: string
  ): Promise<ProjectEntity>
  updateProject(
    id: string,
    api_key: string,
    project: Partial<ProjectEntity>
  ): Promise<ProjectEntity | null>
  deleteProject(id: string, api_key: string): Promise<boolean>
}
