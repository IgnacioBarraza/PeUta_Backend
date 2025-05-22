import { NextFunction, Request, Response } from 'express'
import { UserService } from '../../core/services/UserService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public getByRut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rut } = req.params
      const user = await this.userService.getUserByRut(rut)
      sendResponse(req, res, user, 200)
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
