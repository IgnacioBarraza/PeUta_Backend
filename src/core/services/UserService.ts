import { UserMapper } from '../../adapters/typeorm/Mappers/UserMapper'
import { envConfig } from '../../infrastructure/config/env-config'
import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { UserEntity } from '../entities/UserEntity'
import { UserRepository } from '../ports/UserRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const saltRounds = 12

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByRut(rut: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByRut(rut)

    if (!user) throw new Error('User not found')

    return user
  }

  async register(user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.getUserByRut(user.rut!)
    if (existingUser) throw new Error('User already registered')

    // const role = await this.

    const hashPassword = await bcrypt.hash(user.password!, saltRounds)

    const newUser = {
      ...user,
      password: hashPassword,
    }

    const createdUser = await this.userRepository.register(newUser)

    if (!createdUser) throw new Error('Error register user')

    return UserMapper.toDomain(createdUser)
  }

  async login(rut: string, password: string): Promise<UserEntity> {
    const user = await this.getUserByRut(rut)
    if (!user) throw new CustomError('User not found', 401)

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      throw new CustomError('Password incorrect, try again', 401)

    const token = jwt.sign({ user: user }, envConfig.jwtSecret as string, {
      expiresIn: '3h',
    })
  }
}
