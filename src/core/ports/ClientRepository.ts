import { ClientEntity } from '../entities/ClientEntity'
import { ClientStaffEntity } from '../entities/ClientStaffEntity'

export interface ClientRepository {
  getAllClients(): Promise<ClientEntity[]>
  getClientById(id: string): Promise<ClientEntity | null>
  getClientByName(name: string): Promise<ClientEntity | null>
  getClientByApikey(api_key: string): Promise<ClientEntity | null>
  createClient(clientData: Partial<ClientEntity>): Promise<ClientEntity | null>
  updateClient(
    id: string,
    clientData: Partial<ClientEntity>
  ): Promise<ClientEntity | null>
  deleteClient(id: string): Promise<boolean>
  addStaff(id: string, staff: Partial<ClientStaffEntity>): Promise<void>
}
