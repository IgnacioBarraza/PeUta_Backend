import { envConfig } from '../../infrastructure/config/env-config'
import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { UserEntity } from '../entities/UserEntity'
import { UserRepository } from '../ports/UserRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RoleRepository } from '../ports/RoleRepository'
const saltRounds = 12

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ) {}

  async getAllUser(): Promise<UserEntity[]> {
    const users = await this.userRepository.getAllUsers()
    if (users.length === 0)
      throw new CustomError('Users not found', 404, ['Usuarios no encontrados'])

    return users
  }

  async getUserByRut(rut: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByRut(rut)

    if (!user)
      throw new CustomError('User not found', 404, ['Usuario no encontrado'])

    return user
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByEmail(email)

    if (!user)
      throw new CustomError('User not found', 404, ['Usuario no encontrado'])

    return user
  }

  async register(user: Partial<UserEntity>): Promise<string> {
    if (!user.email && !user.rut)
      throw new CustomError('Rut or email not found', 400, [
        'Rut or email not found',
      ])

    const existingUser = user.email
      ? await this.userRepository.getUserByEmail(user.email!)
      : await this.userRepository.getUserByRut(user.rut!)

    if (existingUser)
      throw new CustomError('User already registered', 400, [
        'Usuario ya registrado',
      ])

    const role = user.role
      ? await this.roleRepository.getRoleById(user.role.id)
      : await this.roleRepository.getDefaultRole()

    const hashPassword = await bcrypt.hash(user.password!, saltRounds)

    const newUser = {
      ...user,
      password: hashPassword,
      role: role!,
    }

    const createdUser = await this.userRepository.register(newUser)

    if (!createdUser)
      throw new CustomError('Error register user', 500, [
        'Error al registrar usuario',
      ])

    const token = jwt.sign(
      {
        user: createdUser.id,
        rut: createdUser.rut,
        role: createdUser.role.name,
      },
      envConfig.jwtSecret as string,
      {
        expiresIn: '3h',
      }
    )
    return token
  }

  async login(identifier: string, password: string): Promise<string> {
    const user = identifier.includes('@')
      ? await this.getUserByEmail(identifier)
      : await this.getUserByRut(identifier)
    if (!user)
      throw new CustomError('User not found', 401, ['Usuario no encontrado'])

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      throw new CustomError('Password incorrect, try again', 401, [
        'Contraseña incorrecta, intente de nuevo',
      ])

    const token = jwt.sign(
      { user: user.id, identifier: identifier, role: user.role.name },
      envConfig.jwtSecret as string,
      {
        expiresIn: '3h',
      }
    )

    return token
  }
}
