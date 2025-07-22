import { NextFunction, Request, Response } from 'express'
import { EventService } from '../../core/services/EventService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'

export class EventController {
  private eventService: EventService

  constructor(eventService: EventService) {
    this.eventService = eventService
  }

  public getAllEventsByApikey = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)

      const events = await this.eventService.getAllEventsByApikey(api_key)
      sendResponse(req, res, events, 200)
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

  public getEventByIdAndApikey = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)

      const event = await this.eventService.getEventByIdAndApikey(id, api_key)
      sendResponse(req, res, event, 200)
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

  public createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)

      const newEvent = await this.eventService.createEvent(data, api_key)
      sendResponse(req, res, newEvent, 201)
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

  public updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)

      const updatedEvent = await this.eventService.updateEvent(
        id,
        data,
        api_key
      )
      sendResponse(req, res, updatedEvent, 200)
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

  public deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)

      const deletedEvent = await this.eventService.deleteEvent(id, api_key)
      sendResponse(req, res, deletedEvent, 200)
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
