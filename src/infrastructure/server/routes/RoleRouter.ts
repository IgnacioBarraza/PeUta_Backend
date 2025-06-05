import { Router } from 'express'
import { RoleRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/RoleRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { RoleRepository } from '../../../core/ports/RoleRepository'
import { RoleService } from '../../../core/services/RoleService'
import { RoleController } from '../../controllers/RoleController'

const roleRepository: RoleRepository = new RoleRepositoryImpl(AppDataSource)
const roleService = new RoleService(roleRepository)
const roleController = new RoleController(roleService)

export const roleRouter = Router()

roleRouter.get('/', roleController.getAllRoles)
roleRouter.get('/:uid', roleController.getRoleById)
roleRouter.post('/', roleController.createRole)
roleRouter.put('/:uid', roleController.updateRole)
roleRouter.delete('/:uid', roleController.deleteRole)
