import { NextFunction, Request, Response } from 'express'
import { UserService } from '../../core/services/UserService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.userService.getAllUser()
      sendResponse(req, res, users, 200)
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

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rut, password } = req.body
      const token = await this.userService.login(rut, password)

      sendResponse(req, res, { message: 'Inicio de sesión exitoso' }, 200, [
        {
          name: 'user_token',
          value: token,
          options: {
            maxAge: 3 * 60 * 60 * 1000, // 3 horas
          },
        },
      ])
    } catch (error) {
      console.error(error)
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

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = req.body
      const token = await this.userService.register(data)

      sendResponse(req, res, { message: 'Registro de sesión exitoso' }, 201, [
        {
          name: 'user_token',
          value: token,
          options: {
            maxAge: 3 * 60 * 60 * 1000, // 3 horas
          },
        },
      ])
    } catch (error) {
      console.error(error)
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
