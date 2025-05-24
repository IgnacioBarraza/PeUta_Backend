import { Router } from 'express'
import { UserController } from '../../controllers/UserController'
import { UserService } from '../../../core/services/UserService'
import { UserRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/UserRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { UserRepository } from '../../../core/ports/UserRepository'

const userRepository: UserRepository = new UserRepositoryImpl(AppDataSource)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export const userRouter = Router()

userRouter.get('/', userController.getAllUsers)
userRouter.post('/signup', userController.register)
userRouter.get('/:rut', userController.getByRut)
userRouter.post('/login', userController.login)
