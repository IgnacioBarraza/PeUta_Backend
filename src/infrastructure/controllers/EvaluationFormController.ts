import { NextFunction, Request, Response } from 'express'
import { EvaluationFormService } from '../../core/services/EvaluationFormService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'

export class EvaluationFormController {
  private formService: EvaluationFormService

  constructor(formService: EvaluationFormService) {
    this.formService = formService
  }

  public getAllForms = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      const forms = await this.formService.getAllForms(api_key)
      sendResponse(req, res, forms, 200)
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

  public getFormById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const form = await this.formService.getFormById(api_key, id)
      sendResponse(req, res, form, 200)
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

  public getFormsByEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { eventId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const forms = await this.formService.getFormsByEvent(api_key, eventId)
      sendResponse(req, res, forms, 200)
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

  public createForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const form = await this.formService.createForm(api_key, data)
      sendResponse(req, res, form, 201)
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

  public updateForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const form = await this.formService.updateForm(api_key, id, data)
      sendResponse(req, res, form, 200)
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

  public deleteForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      await this.formService.deleteForm(api_key, id)
      sendResponse(
        req,
        res,
        'Formulario de evaluación eliminado correctamente',
        200
      )
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
