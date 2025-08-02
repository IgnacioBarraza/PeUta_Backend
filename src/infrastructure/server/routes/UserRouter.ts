import { Router } from 'express'
import { UserController } from '../../controllers/UserController'
import { UserService } from '../../../core/services/UserService'
import { UserRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/UserRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { UserRepository } from '../../../core/ports/UserRepository'
import { RoleRepository } from '../../../core/ports/RoleRepository'
import { RoleRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/RoleRepositoryImpl'
import { authenticateToken } from '../../middlewares/authMiddleware'

const userRepository: UserRepository = new UserRepositoryImpl(AppDataSource)
const roleRepository: RoleRepository = new RoleRepositoryImpl(AppDataSource)
const userService = new UserService(userRepository, roleRepository)
const userController = new UserController(userService)

export const userRouter = Router()

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.register)

userRouter.use(authenticateToken)

userRouter.get('/', userController.getAllUsers)
userRouter.get('/rut/:rut', userController.getByRut)
userRouter.get('/email/:email', userController.getByEmail)
userRouter.get('/id/:id', userController.getById)
userRouter.delete('/:id', userController.deleteUser)
userRouter.patch('/:id', userController.updateUser)
