import { Router } from 'express'
import { ProjectMemberController } from '../../controllers/ProjectMemberController'
import { ProjectMemberService } from '../../../core/services/ProjectMemberService'
import { ProjectMemberRepository } from '../../../core/ports/ProjectMemberRepository'
import { ProjectMemberRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ProjectMemberRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { ProjectRepository } from '../../../core/ports/ProjectRepository'
import { ProjectRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ProjectRepositoryImpl'
import { validateApiKEy } from '../../middlewares/validateApiKey'

const memberRepository: ProjectMemberRepository =
  new ProjectMemberRepositoryImpl(AppDataSource)
const projectRepository: ProjectRepository = new ProjectRepositoryImpl(
  AppDataSource
)
const memberService = new ProjectMemberService(
  memberRepository,
  projectRepository
)
const memberController = new ProjectMemberController(memberService)

export const memberRouter = Router()

memberRouter.use(validateApiKEy)

memberRouter.get('/', memberController.getAllProjectMembers)
memberRouter.get('/:projectId', memberController.getProjectMember)
memberRouter.post('/', memberController.addProjectMember)
memberRouter.patch(
  '/:id/project/:projectId',
  memberController.updateProjectMember
)
memberRouter.delete(
  '/:id/project/:projectId',
  memberController.removeProjectMember
)
