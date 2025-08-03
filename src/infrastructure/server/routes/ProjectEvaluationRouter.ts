import { Router } from 'express'
import { ProjectEvaluationController } from '../../controllers/ProjectEvaluationController'
import { ProjectEvaluationService } from '../../../core/services/ProjectEvaluationService'
import { ProjectEvaluationRepository } from '../../../core/ports/ProjectEvaluationRepository'
import { ProjectEvaluationRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ProjectEvaluationRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { EvaluationAnswerRepository } from '../../../core/ports/EvaluationAnswerRepository'
import { EvaluationAnswerRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationAnswerRepositoryImpl'
import { UserRepository } from '../../../core/ports/UserRepository'
import { UserRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/UserRepositoryImpl'
import { EvaluationQuestionRepository } from '../../../core/ports/EvaluationQuestionRepository'
import { EvaluationQuestionRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationQuestionRepositoryImpl'
import { ProjectRepository } from '../../../core/ports/ProjectRepository'
import { ProjectRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ProjectRepositoryImpl'
import { EvaluationFormRepository } from '../../../core/ports/EvaluationFormRepository'
import { EvaluationFormRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationFormRepositoryImpl'
import { authorizeEvaluation } from '../../middlewares/authorizeEvaluation'

const evaluationRepository: ProjectEvaluationRepository =
  new ProjectEvaluationRepositoryImpl(AppDataSource)
const answerRepository: EvaluationAnswerRepository =
  new EvaluationAnswerRepositoryImpl(AppDataSource)
const userRepository: UserRepository = new UserRepositoryImpl(AppDataSource)
const questionRepository: EvaluationQuestionRepository =
  new EvaluationQuestionRepositoryImpl(AppDataSource)
const projectRepository: ProjectRepository = new ProjectRepositoryImpl(
  AppDataSource
)
const formRepository: EvaluationFormRepository =
  new EvaluationFormRepositoryImpl(AppDataSource)

const evaluationService = new ProjectEvaluationService(
  evaluationRepository,
  answerRepository,
  userRepository,
  questionRepository,
  projectRepository,
  formRepository
)
const evaluationController = new ProjectEvaluationController(evaluationService)

export const evaluationRouter = Router()

evaluationRouter.get('/', evaluationController.getAllEvaluations)
evaluationRouter.get('/:id', evaluationController.getEvaluationById)
evaluationRouter.get(
  '/project/:projectId',
  evaluationController.getEvaluationsByProject
)
evaluationRouter.get(
  '/user/:userId/event/:eventId',
  evaluationController.getEvaluatedProjectsByUser
)
evaluationRouter.get(
  '/user/:userId/project/:projectId',
  evaluationController.hasUserEvaluatedProject
)
evaluationRouter.post(
  '/',
  authorizeEvaluation,
  evaluationController.createEvaluation
)
evaluationRouter.delete('/:id', evaluationController.deleteEvaluation)
