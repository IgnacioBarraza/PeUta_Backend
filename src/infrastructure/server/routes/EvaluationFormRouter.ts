import { Router } from 'express'
import { EvaluationFormController } from '../../controllers/EvaluationFormController'
import { EvaluationFormService } from '../../../core/services/EvaluationFormService'
import { ClientRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ClientRepositoryImpl'
import { EventRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EventRepositoryImpl'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { EventRepository } from '../../../core/ports/EventRepository'
import { ClientService } from '../../../core/services/ClientService'
import { AppDataSource } from '../../orm/data-source'
import { EvaluationFormRepository } from '../../../core/ports/EvaluationFormRepository'
import { EvaluationFormRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationFormRepositoryImpl'
import { validateApiKEy } from '../../middlewares/validateApiKey'

const clientRepository: ClientRepository = new ClientRepositoryImpl(
  AppDataSource
)
const clientService = new ClientService(clientRepository)
const eventRepository: EventRepository = new EventRepositoryImpl(
  AppDataSource,
  clientService
)

const formRepository: EvaluationFormRepository =
  new EvaluationFormRepositoryImpl(AppDataSource)

const formService = new EvaluationFormService(formRepository, eventRepository)
const formController = new EvaluationFormController(formService)

export const formRouter = Router()

formRouter.use(validateApiKEy)

formRouter.get('/', formController.getAllForms)
formRouter.get('/:id', formController.getFormById)
formRouter.post('/', formController.createForm)
formRouter.patch('/:id', formController.updateForm)
formRouter.delete('/:id', formController.deleteForm)
