import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { generateApiKey } from '../../utils/apikeyUtils'
import { normalizeName } from '../../utils/utils'
import { ClientEntity } from '../entities/ClientEntity'
import { ClientRepository } from '../ports/ClientRepository'
import {
  ClientCreateSchema,
  ClientUpdateSchema,
} from '../validations/ClientValidation'

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async getAllClients(): Promise<ClientEntity[] | []> {
    const clients = await this.clientRepository.getAllClients()

    if (clients.length === 0)
      throw new CustomError('No clients found', 404, ['No clients found'])

    return clients
  }

  async getClientById(id: string): Promise<ClientEntity | null> {
    const client = await this.clientRepository.getClientById(id)

    if (!client)
      throw new CustomError('Client not found', 404, ['Client not found'])

    return client
  }

  async createClient(client: Partial<ClientEntity>): Promise<ClientEntity> {
    const parsedData = ClientCreateSchema.strict().safeParse(client)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const data = parsedData.data

    const normalizedName = normalizeName(data.name)
    const existingClient =
      await this.clientRepository.getClientByName(normalizedName)

    if (existingClient)
      throw new CustomError('Client already exists', 400, [
        'Client already exists',
      ])

    const apiKey = generateApiKey()
    const newClient = await this.clientRepository.createClient({
      ...data,
      api_key: apiKey,
    })

    if (!newClient)
      throw new CustomError('Client not created', 500, ['Client not created'])

    return newClient
  }

  async updateClient(
    id: string,
    client: Partial<ClientEntity>
  ): Promise<ClientEntity | null> {
    const parsedData = ClientUpdateSchema.strict().safeParse(client)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const data = parsedData.data

    if (data.name) {
      const existing = await this.clientRepository.getClientByName(data.name)
      if (existing && existing.id !== id)
        throw new CustomError('Client name already in use', 400)
    }

    const updated = await this.clientRepository.updateClient(id, data)
    if (!updated)
      throw new CustomError('Client not updated', 500, ['Client not updated'])

    return updated
  }

  async deleteClient(id: string): Promise<void> {
    await this.clientRepository.deleteClient(id)
  }
}
