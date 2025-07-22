import { NextFunction, Request, Response } from 'express'
import { ClientService } from '../../core/services/ClientService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class ClientController {
  private clientService: ClientService

  constructor(clientService: ClientService) {
    this.clientService = clientService
  }

  public getAllClients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const clients = await this.clientService.getAllClients()
      sendResponse(req, res, clients, 200)
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

  public getClientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const client = await this.clientService.getClientById(id)
      sendResponse(req, res, client, 200)
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

  public createClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const clientData = req.body
    try {
      const newClient = await this.clientService.createClient(clientData)
      sendResponse(req, res, newClient, 201)
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

  public updateClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const clientData = req.body
    try {
      const updatedClient = await this.clientService.updateClient(
        id,
        clientData
      )
      sendResponse(req, res, updatedClient, 200)
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

  public deleteClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      await this.clientService.deleteClient(id)
      sendResponse(req, res, 'Client borrado con exito', 204)
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
