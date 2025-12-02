import { envConfig } from '../../infrastructure/config/env-config'
import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { UserEntity } from '../entities/UserEntity'
import { UserRepository } from '../ports/UserRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RoleRepository } from '../ports/RoleRepository'
import { validateRut, normalizeRut } from '../../utils/authUtils'
import {
  CreateUserSchema,
  UpdateUserSchema,
} from '../validations/UserValidation'
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

  async getuserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserById(id)
    if (!user)
      throw new CustomError('User not found', 404, ['Usuario no encontrado'])
    return user
  }

  async registerByRut(user: Partial<UserEntity>): Promise<string> {
    if (!user.rut) {
      throw new CustomError('RUT requerido', 400, ['RUT requerido'])
    }

    const formattedRut = normalizeRut(user.rut)

    if (!validateRut(formattedRut)) {
      throw new CustomError('RUT inválido', 400, ['RUT inválido'])
    }

    return formattedRut
  }

  async register(user: Partial<UserEntity>): Promise<string> {
    const parsedData = CreateUserSchema.strict().safeParse(user)
    if (!parsedData.success) {
      throw new CustomError('Validation error', 400, parsedData.error)
    }

    const data = parsedData.data
    if (data.email && data.rut) {
      throw new CustomError('Rut or email not found', 400, [
        'Rut or email not found',
      ])
    }

    let existingUser: UserEntity | null = null
    let normalizedRut: string | undefined = undefined

    if (data.email) {
      existingUser = await this.userRepository.getUserByEmail(data.email)
    } else if (data.rut) {
      normalizedRut = await this.registerByRut(user)
      existingUser = await this.userRepository.getUserByRut(normalizedRut)
    }

    if (existingUser) {
      throw new CustomError('User already registered', 400, [
        'Usuario ya registrado',
      ])
    }

    const role = data.role
      ? await this.roleRepository.getRoleById(data.role)
      : await this.roleRepository.getDefaultRole()

    const hashPassword = await bcrypt.hash(data.password, saltRounds)

    const newUser: Partial<UserEntity> = {
      ...data,
      password: hashPassword,
      role: role!,
      rut: normalizedRut,
    }

    const createdUser = await this.userRepository.register(newUser)

    if (!createdUser) {
      throw new CustomError('Error register user', 500, [
        'Error al registrar usuario',
      ])
    }

    const token = jwt.sign(
      {
        user: createdUser.id,
        rut: createdUser.rut,
        role: createdUser.role,
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
      { user: user.id, identifier: identifier, role: user.role },
      envConfig.jwtSecret as string,
      {
        expiresIn: '3h',
      }
    )

    return token
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id)
  }

  async updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const parsedData = UpdateUserSchema.strict().safeParse(user)
    if (!parsedData.success)
      throw new CustomError('Validation error', 400, parsedData.error)

    const data = parsedData.data

    const existingUser = await this.getuserById(id)
    if (!existingUser)
      throw new CustomError('User not found', 404, ['Usuario no encontrado'])

    const updatedFields: Partial<UserEntity> = {
      ...data,
      role: existingUser.role,
    }

    if (data.role) {
      const updatedRole = await this.roleRepository.getRoleById(data.role)
      if (!updatedRole)
        throw new CustomError('Role not found', 404, ['Rol no encontrado'])

      updatedFields.role = updatedRole
    }

    const updatedUser = await this.userRepository.updateUser(id, updatedFields)

    if (!updatedUser)
      throw new CustomError('User not updated', 404, ['Usuario no actualizado'])

    return updatedUser
  }
}
