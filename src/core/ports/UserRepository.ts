import { UserEntity } from '../entities/UserEntity'

export interface UserRepository {
  getAllUsers(): Promise<UserEntity[] | []>
  getUserByRut(rut: string): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
  register(userData: Partial<UserEntity>): Promise<UserEntity | null>
  login(identifier: string, password: string): Promise<UserEntity | null>
}
