import { Router } from 'express'
import { RoleRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/RoleRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { RoleRepository } from '../../../core/ports/RoleRepository'
import { RoleService } from '../../../core/services/RoleService'
import { RoleController } from '../../controllers/RoleController'
import { authorizeRoles } from '../../middlewares/authorizeRole'
import { authenticateToken } from '../../middlewares/authMiddleware'

const roleRepository: RoleRepository = new RoleRepositoryImpl(AppDataSource)
const roleService = new RoleService(roleRepository)
const roleController = new RoleController(roleService)

export const roleRouter = Router()

roleRouter.get('/', roleController.getAllRoles)
roleRouter.get('/:id', roleController.getRoleById)

roleRouter.use(authenticateToken, authorizeRoles(['super_admin']))

roleRouter.post('/', roleController.createRole)
roleRouter.patch('/:id', roleController.updateRole)
roleRouter.delete('/:id', roleController.deleteRole)
