import { Router } from 'express'
import { CategoryController } from '../../controllers/CategoryController'
import { CategoryService } from '../../../core/services/CategoryService'
import { CategoryRepository } from '../../../core/ports/CategoryRepository'
import { CategoryRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/CategoryRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { ClientRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ClientRepositoryImpl'
import { EventRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EventRepositoryImpl'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { EventRepository } from '../../../core/ports/EventRepository'
import { ClientService } from '../../../core/services/ClientService'

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

const categoryService = new CategoryService(categoryRepository, eventRepository)
const categoryController = new CategoryController(categoryService)

export const categoryRouter = Router()

categoryRouter.get('/', categoryController.getAllCategories)
categoryRouter.get('/:id', categoryController.getCategoryById)
categoryRouter.get('/event/:eventId', categoryController.getCategoryById)
categoryRouter.post('/', categoryController.createCategory)
categoryRouter.patch('/:id', categoryController.updateCategory)
categoryRouter.delete('/:id', categoryController.deleteCategory)
