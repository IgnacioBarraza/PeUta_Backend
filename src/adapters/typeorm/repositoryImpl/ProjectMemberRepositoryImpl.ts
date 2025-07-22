import { DataSource, Repository } from 'typeorm'
import { ProjectMemberRepository } from '../../../core/ports/ProjectMemberRepository'
import { ProjectMember } from '../schema/ProjectMember'
import { ProjectMemberEntity } from '../../../core/entities/ProjectMemberEntity'
import { ProjectMemberMapper } from '../Mappers/ProjectMemberMapper'

export class ProjectMemberRepositoryImpl implements ProjectMemberRepository {
  private db: DataSource
  private memberRepository: Repository<ProjectMember>

  constructor(db: DataSource) {
    this.db = db
    this.memberRepository = db.getRepository(ProjectMember)
  }

  async getAllProjectMembers(api_key: string): Promise<ProjectMemberEntity[]> {
    const members = await this.memberRepository.find({
      where: {
        project: {
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    return members.map(member => ProjectMemberMapper.toDomain(member))
  }

  async getProjectMembers(
    api_key: string,
    projectId: string
  ): Promise<ProjectMemberEntity[]> {
    const members = await this.memberRepository.find({
      where: {
        project: {
          id: projectId,
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
      relations: {
        project: true,
      },
    })

    return members.map(member => ProjectMemberMapper.toDomain(member))
  }

  async addProjectMember(
    data: Partial<ProjectMemberEntity>
  ): Promise<ProjectMemberEntity> {
    const member = this.memberRepository.create(data)
    const saved = await this.memberRepository.save(member)
    return ProjectMemberMapper.toDomain(saved)
  }

  async removeProjectMember(
    api_key: string,
    id: string,
    projectId: string
  ): Promise<boolean> {
    const member = await this.memberRepository.findOne({
      where: {
        id: id,
        project: {
          id: projectId,
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    if (!member) return false

    await this.memberRepository.delete(id)
    return true
  }

  async updateProjectMember(
    api_key: string,
    id: string,
    projectId: string,
    data: Partial<ProjectMemberEntity>
  ): Promise<ProjectMemberEntity> {
    const existing = await this.memberRepository.findOne({
      where: {
        id,
        project: {
          id: projectId,
          event: {
            client: {
              api_key: api_key,
            },
          },
        },
      },
    })

    if (!existing) {
      throw new Error('Project member not found')
    }

    const updated = this.memberRepository.merge(existing, data)
    const saved = await this.memberRepository.save(updated)

    return ProjectMemberMapper.toDomain(saved)
  }
}
