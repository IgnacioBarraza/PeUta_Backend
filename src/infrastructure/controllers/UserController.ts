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

  public getByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.params
      const user = await this.userService.getUserByEmail(email)
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

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await this.userService.getuserById(id)
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
      const { identifier, password } = req.body
      const token = await this.userService.login(identifier, password)

      sendResponse(req, res, { token: token }, 200, [
        {
          name: 'user_token',
          value: token,
          options: {
            maxAge: 3 * 60 * 60 * 1000, // 3 horas
          },
        },
      ])
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

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = req.body
      const token = await this.userService.register(data)

      sendResponse(req, res, { token: token }, 201, [
        {
          name: 'user_token',
          value: token,
          options: {
            maxAge: 3 * 60 * 60 * 1000, // 3 horas
          },
        },
      ])
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

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params
    try {
      await this.userService.deleteUser(id)
      sendResponse(req, res, 'User borrado con exito!', 204)
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

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params
    const data = req.body
    try {
      const user = await this.userService.updateUser(id, data)
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
