import { NextFunction, Request, Response } from 'express'
import { EvaluationQuestionService } from '../../core/services/EvaluationQuestionService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'

export class EvaluationQuestionController {
  private questionService: EvaluationQuestionService

  constructor(questionService: EvaluationQuestionService) {
    this.questionService = questionService
  }

  public getAllQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      const questions = await this.questionService.getAllQuestions(api_key)
      sendResponse(req, res, questions, 200)
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

  public getQuestionById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const question = await this.questionService.getQuestionById(api_key, id)
      sendResponse(req, res, question, 200)
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

  public createQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const newQuestion = await this.questionService.createQuestion(
        api_key,
        data
      )
      sendResponse(req, res, newQuestion, 201)
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

  public updateQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const updatedQuestion = await this.questionService.updateQuestion(
        api_key,
        id,
        data
      )
      sendResponse(req, res, updatedQuestion, 200)
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

  public deleteQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      await this.questionService.deleteQuestion(api_key, id)
      sendResponse(req, res, 'Pregunta eliminada correctamente', 200)
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
