import { Router } from 'express'
import { ClientController } from '../../controllers/ClientController'
import { ClientService } from '../../../core/services/ClientService'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { ClientRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ClientRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'

const clientRepository: ClientRepository = new ClientRepositoryImpl(
  AppDataSource
)
const clientService = new ClientService(clientRepository)
const clientController = new ClientController(clientService)

export const clientRouter = Router()

clientRouter.get('/', clientController.getAllClients)
clientRouter.get('/:id', clientController.getClientById)
clientRouter.post('/', clientController.createClient)
clientRouter.patch('/:id', clientController.updateClient)
clientRouter.delete('/:id', clientController.deleteClient)
