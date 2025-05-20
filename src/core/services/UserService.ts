import { UserEntity } from "../entities/UserEntity";
import { UserRepository } from "../ports/UserRepository";
import bcrypt from 'bcrypt'

const saltRounds = 13

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByRut(rut: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByRut(rut)

    if (!user) throw new Error('User not found')

    return user
  }

  async register(user: Partial<UserEntity>): Promise<UserEntity | null> {
    const existingUser = await this.getUserByRut(user.rut!)
    if (existingUser) throw new Error('User already registered')

    const hashPassword = bcrypt.hash(user.password!, saltRounds)

    

    return null
  }
}