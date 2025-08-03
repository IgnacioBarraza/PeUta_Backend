import { Router } from 'express'
import { ClientController } from '../../controllers/ClientController'
import { ClientService } from '../../../core/services/ClientService'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { ClientRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ClientRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { authenticateToken } from '../../middlewares/authMiddleware'
import { authorizeRoles } from '../../middlewares/authorizeRole'

const clientRepository: ClientRepository = new ClientRepositoryImpl(
  AppDataSource
)
const clientService = new ClientService(clientRepository)
const clientController = new ClientController(clientService)

export const clientRouter = Router()

clientRouter.use(authenticateToken)

// Acceso a admins y super_admins
clientRouter.use(authorizeRoles(['admin', 'super_admin']))
clientRouter.get('/', clientController.getAllClients)
clientRouter.get('/:id', clientController.getClientById)
clientRouter.patch('/:id', clientController.updateClient)
clientRouter.delete('/:id', clientController.deleteClient)

// Solo super_admin puede crear
clientRouter.post(
  '/',
  authorizeRoles(['super_admin']),
  clientController.createClient
)
