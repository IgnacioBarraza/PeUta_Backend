import { NextFunction, Request, Response } from 'express'
import { ProjectEvaluationService } from '../../core/services/ProjectEvaluationService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'
import { AuthenticatedRequest } from '../middlewares/authMiddleware'

export class ProjectEvaluationController {
  private evaluationService: ProjectEvaluationService

  constructor(evaluationService: ProjectEvaluationService) {
    this.evaluationService = evaluationService
  }

  public getAllEvaluations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      console.log(api_key)
      const evaluations =
        await this.evaluationService.getAllEvaluations(api_key)
      sendResponse(req, res, evaluations, 200)
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

  public getEvaluationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)

      console.log(id, 'id')
      console.log(api_key, 'api_key')
      const evaluation = await this.evaluationService.getEvaluationById(
        api_key,
        id
      )
      sendResponse(req, res, evaluation, 200)
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

  public getEvaluationsByProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { projectId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const evaluations = await this.evaluationService.getEvaluationsByProject(
        api_key,
        projectId
      )
      sendResponse(req, res, evaluations, 200)
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

  public getEvaluatedProjectsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, eventId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const evaluations =
        await this.evaluationService.getEvaluatedProjectByUser(
          api_key,
          userId,
          eventId
        )
      sendResponse(req, res, evaluations, 200)
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

  public createEvaluation = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    const user_id = req.userId
    try {
      if (!user_id)
        throw new CustomError('User ID is required', 400, [
          'User ID is required',
        ])

      const api_key = getApiKeyFromHeaders(req)
      const evaluation = await this.evaluationService.createEvaluation(
        api_key,
        user_id,
        data
      )
      sendResponse(req, res, evaluation, 201)
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

  public deleteEvaluation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      await this.evaluationService.deleteEvaluation(api_key, id)
      sendResponse(req, res, 'Evaluación eliminada correctamente', 200)
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
