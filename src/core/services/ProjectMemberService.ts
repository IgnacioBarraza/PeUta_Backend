import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { ProjectMemberEntity } from '../entities/ProjectMemberEntity'
import { ProjectMemberRepository } from '../ports/ProjectMemberRepository'
import { ProjectRepository } from '../ports/ProjectRepository'
import {
  CreateMemberSchema,
  UpdateMemberSchema,
} from '../validations/ProjectMemberValidation'

export class ProjectMemberService {
  constructor(
    private memberRepository: ProjectMemberRepository,
    private projectRepository: ProjectRepository
  ) {}

  async getAllMembers(api_key: string): Promise<ProjectMemberEntity[]> {
    const members = await this.memberRepository.getAllProjectMembers(api_key)

    if (members.length === 0)
      throw new CustomError('No members found', 404, ['No members found'])

    return members
  }

  async getProjectMembers(
    api_key: string,
    projectId: string
  ): Promise<ProjectMemberEntity[]> {
    const members = await this.memberRepository.getProjectMembers(
      api_key,
      projectId
    )
    if (!members)
      throw new CustomError('Members not found', 404, ['Members not found'])

    return members
  }

  async addProjectMember(
    api_key: string,
    member: Partial<ProjectMemberEntity>
  ): Promise<ProjectMemberEntity> {
    const parsedData = CreateMemberSchema.strict().safeParse(member)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const { project_id, ...rest } = parsedData.data

    const project = await this.projectRepository.getProjectById(
      project_id,
      api_key
    )
    if (!project)
      throw new CustomError('Project not found', 404, ['Project not found'])

    const newMember = await this.memberRepository.addProjectMember({
      ...rest,
      project,
    })
    return newMember
  }

  async updateProjectMember(
    api_key: string,
    id: string,
    projectId: string,
    member: Partial<ProjectMemberEntity>
  ): Promise<ProjectMemberEntity> {
    const parsedData = UpdateMemberSchema.strict().safeParse(member)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const data = parsedData.data

    const updated = await this.memberRepository.updateProjectMember(
      api_key,
      id,
      projectId,
      data
    )
    if (!updated)
      throw new CustomError('Member not found', 404, ['Member not found'])

    return updated
  }

  async removeProjectMember(
    api_key: string,
    id: string,
    projectId: string
  ): Promise<boolean> {
    const deleted = await this.memberRepository.removeProjectMember(
      api_key,
      id,
      projectId
    )
    if (!deleted)
      throw new CustomError('Member not found', 404, ['Member not found'])

    return deleted
  }
}
