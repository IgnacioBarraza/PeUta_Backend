import { ProjectMemberEntity } from '../entities/ProjectMemberEntity'

export interface ProjectMemberRepository {
  getAllProjectMembers(api_key: string): Promise<ProjectMemberEntity[]>
  getProjectMembers(
    api_key: string,
    projectId: string
  ): Promise<ProjectMemberEntity[]>
  addProjectMember(
    data: Partial<ProjectMemberEntity>
  ): Promise<ProjectMemberEntity>
  removeProjectMember(
    api_key: string,
    id: string,
    projectId: string
  ): Promise<boolean>
  updateProjectMember(
    api_key: string,
    id: string,
    projectId: string,
    data: Partial<ProjectMemberEntity>
  ): Promise<ProjectMemberEntity>
}
