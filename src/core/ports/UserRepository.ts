import { UserEntity } from '../entities/UserEntity'

export interface UserRepository {
  getAllUsers(): Promise<UserEntity[] | []>
  register(userData: Partial<UserEntity>): Promise<UserEntity | null>
  login(rut: string, password: string): Promise<UserEntity | null>
}
