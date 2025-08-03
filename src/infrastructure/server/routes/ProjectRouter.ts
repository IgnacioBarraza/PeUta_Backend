import { Router } from 'express'
import { ProjectController } from '../../controllers/ProjectController'
import { ProjectService } from '../../../core/services/ProjectService'
import { ProjectRepository } from '../../../core/ports/ProjectRepository'
import { ProjectRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ProjectRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { EventRepository } from '../../../core/ports/EventRepository'
import { EventRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EventRepositoryImpl'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { ClientRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ClientRepositoryImpl'
import { ClientService } from '../../../core/services/ClientService'
import { CategoryRepository } from '../../../core/ports/CategoryRepository'
import { CategoryRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/CategoryRepositoryImpl'

const clientRepository: ClientRepository = new ClientRepositoryImpl(
  AppDataSource
)
const clientService = new ClientService(clientRepository)

const eventRepository: EventRepository = new EventRepositoryImpl(
  AppDataSource,
  clientService
)
const categoryRepository: CategoryRepository = new CategoryRepositoryImpl(
  AppDataSource
)

const projectRepository: ProjectRepository = new ProjectRepositoryImpl(
  AppDataSource
)

const projectService = new ProjectService(
  projectRepository,
  eventRepository,
  categoryRepository
)
const projectController = new ProjectController(projectService)

export const projectRouter = Router()

projectRouter.get('/', projectController.getAllProjects)
projectRouter.get('/:id', projectController.getProjectById)
projectRouter.get('/event/:eventId', projectController.getProjectsByEvent)
projectRouter.post('/', projectController.createProject)
projectRouter.patch('/:id', projectController.updateProject)
projectRouter.delete('/:id', projectController.deleteProject)
