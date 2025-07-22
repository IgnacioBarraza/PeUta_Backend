import { DataSource, Repository } from 'typeorm'
import { ClientRepository } from '../../../core/ports/ClientRepository'
import { Client } from '../schema/Client'
import { ClientEntity } from '../../../core/entities/ClientEntity'
import { ClientMapper } from '../Mappers/ClientMapper'
import { ClientStaffEntity } from '../../../core/entities/ClientStaffEntity'

export class ClientRepositoryImpl implements ClientRepository {
  private db: DataSource
  private clientRepo: Repository<Client>

  constructor(db: DataSource) {
    this.db = db
    this.clientRepo = this.db.getRepository(Client)
  }

  async getAllClients(): Promise<ClientEntity[]> {
    const clients = await this.clientRepo.find({
      relations: {
        events: {
          client: true,
        },
      },
    })

    console.log(clients[0].events)

    return clients.map(client => ClientMapper.toDomain(client))
  }

  async getClientById(id: string): Promise<ClientEntity | null> {
    const client = await this.clientRepo.findOne({
      where: { id },
      relations: {
        events: {
          client: true,
        },
      },
    })

    return client ? ClientMapper.toDomain(client) : null
  }

  async getClientByName(name: string): Promise<ClientEntity | null> {
    const client = await this.clientRepo.findOne({
      where: { name: name },
      relations: {
        events: {
          client: true,
        },
      },
    })

    return client ? ClientMapper.toDomain(client) : null
  }

  async getClientByApikey(api_key: string): Promise<ClientEntity | null> {
    const client = await this.clientRepo.findOne({
      where: { api_key: api_key },
      relations: {
        events: {
          client: true,
        },
      },
    })

    return client ? ClientMapper.toDomain(client) : null
  }

  async createClient(client: Partial<ClientEntity>): Promise<ClientEntity> {
    const newClient = this.clientRepo.create(
      ClientMapper.toSchema(client as ClientEntity)
    )
    await this.clientRepo.save(newClient)
    return ClientMapper.toDomain(newClient)
  }

  async updateClient(
    id: string,
    clientData: Partial<ClientEntity>
  ): Promise<ClientEntity | null> {
    await this.clientRepo.update(id, clientData)
    return await this.getClientById(id)
  }

  async deleteClient(id: string): Promise<boolean> {
    const deleted = await this.clientRepo.delete(id)

    return deleted.affected !== 0
  }

  async addStaff(id: string, staff: Partial<ClientStaffEntity>): Promise<void> {
    const client = await this.getClientById(id)

    if (client) {
      client.staff = [...(client.staff || []), staff as ClientStaffEntity]
    }

    await this.clientRepo.save(ClientMapper.toSchema(client as ClientEntity))
  }
}
