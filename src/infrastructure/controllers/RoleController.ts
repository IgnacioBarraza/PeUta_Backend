import { NextFunction, Request, Response } from 'express'
import { RoleService } from '../../core/services/RoleService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class RoleController {
  private roleService: RoleService

  constructor(roleService: RoleService) {
    this.roleService = roleService
  }

  public getAllRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const roles = await this.roleService.getAllRoles()
      sendResponse(req, res, roles, 200)
    } catch (error) {
      const { message, errors } = sanitizeError(error)
      next(
        new CustomError(
          message,
          (error as CustomError).statusCode || 500,
          errors
        )
      )
    }
  }

  public getRoleById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const role = await this.roleService.getRoleById(id)
      sendResponse(req, res, role, 200)
    } catch (error) {
      const { message, errors } = sanitizeError(error)
      next(
        new CustomError(
          message,
          (error as CustomError).statusCode || 500,
          errors
        )
      )
    }
  }

  public createRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const newRole = await this.roleService.createRole(data)
      sendResponse(req, res, newRole, 201)
    } catch (error) {
      const { message, errors } = sanitizeError(error)
      next(
        new CustomError(
          message,
          (error as CustomError).statusCode || 500,
          errors
        )
      )
    }
  }

  public updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const data = req.body
    try {
      const updatedRole = await this.roleService.updateRole(id, data)
      sendResponse(req, res, updatedRole, 200)
    } catch (error) {
      const { message, errors } = sanitizeError(error)
      next(
        new CustomError(
          message,
          (error as CustomError).statusCode || 500,
          errors
        )
      )
    }
  }

  public deleteRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      await this.roleService.deleteRole(id)
      sendResponse(req, res, 'Role deleted succesfully', 200)
    } catch (error) {
      const { message, errors } = sanitizeError(error)
      next(
        new CustomError(
          message,
          (error as CustomError).statusCode || 500,
          errors
        )
      )
    }
  }
}
