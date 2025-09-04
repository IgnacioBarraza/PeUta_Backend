import { Router } from 'express'
import { EventController } from '../../controllers/EventController'
import { EventService } from '../../../core/services/EventService'
import { EventRepository } from '../../../core/ports/EventRepository'
import { EventRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EventRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { ClientRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ClientRepositoryImpl'
import { ClientService } from '../../../core/services/ClientService'
import { validateApiKEy } from '../../middlewares/validateApiKey'
import { authenticateToken } from '../../middlewares/authMiddleware'
import { authorizeRoles } from '../../middlewares/authorizeRole'

const clientRepository: ClientRepository = new ClientRepositoryImpl(
  AppDataSource
)
const clientService = new ClientService(clientRepository)
const eventRepository: EventRepository = new EventRepositoryImpl(
  AppDataSource,
  clientService
)
const eventService = new EventService(eventRepository, clientRepository)
const eventController = new EventController(eventService)
export const eventRouter = Router()

eventRouter.use(validateApiKEy)

eventRouter.get('/', eventController.getAllEventsByApikey)
eventRouter.get('/:id', eventController.getEventByIdAndApikey)

eventRouter.use(
  authenticateToken,
  authorizeRoles(['super_admin', 'admin', 'staff'])
)
eventRouter.post('/', eventController.createEvent)
eventRouter.patch('/:id', eventController.updateEvent)
eventRouter.delete('/:id', eventController.deleteEvent)
