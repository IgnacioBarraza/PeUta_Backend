import { NextFunction, Request, Response } from 'express'
import { EvaluationAnswerService } from '../../core/services/EvaluationAnswerService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'

export class EvaluationAnswerController {
  private answerService: EvaluationAnswerService

  constructor(answerService: EvaluationAnswerService) {
    this.answerService = answerService
  }

  public getAnswerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const answer = await this.answerService.getAnswerById(id, api_key)
      sendResponse(req, res, answer, 200)
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

  public getAllAnswers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      const answers = await this.answerService.getAllAnswers(api_key)
      sendResponse(req, res, answers, 200)
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

  public createAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const answer = await this.answerService.createAnswer(data)
      sendResponse(req, res, answer, 201)
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

  public deleteAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      await this.answerService.deleteAnswer(api_key, id)
      sendResponse(req, res, 'Respuesta eliminada exitosamente', 200)
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
