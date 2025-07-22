import { NextFunction, Request, Response } from 'express'
import { ProjectService } from '../../core/services/ProjectService'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class ProjectController {
  private projectService: ProjectService

  constructor(projectService: ProjectService) {
    this.projectService = projectService
  }

  public getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      const projects = await this.projectService.getAllProjects(api_key)
      sendResponse(req, res, projects, 200)
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

  public getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const project = await this.projectService.getProjectById(api_key, id)
      sendResponse(req, res, project, 200)
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

  public getProjectsByEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { eventId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const projects = await this.projectService.getProjectsByEvent(
        api_key,
        eventId
      )
      sendResponse(req, res, projects, 200)
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

  public createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const project = await this.projectService.createProject(data, api_key)
      sendResponse(req, res, project, 201)
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

  public updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const project = await this.projectService.updateProject(id, api_key, data)
      sendResponse(req, res, project, 200)
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

  public deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      await this.projectService.deleteProject(id, api_key)
      sendResponse(req, res, 'Proyecto eliminado correctamente', 200)
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
