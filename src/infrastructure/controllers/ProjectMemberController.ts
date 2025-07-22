import { NextFunction, Request, Response } from 'express'
import { ProjectMemberService } from '../../core/services/ProjectMemberService'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class ProjectMemberController {
  private memberService: ProjectMemberService

  constructor(memberService: ProjectMemberService) {
    this.memberService = memberService
  }

  public getAllProjectMembers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      const members = await this.memberService.getAllMembers(api_key)
      sendResponse(req, res, members, 200)
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

  public getProjectMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { projectId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const member = await this.memberService.getProjectMembers(
        api_key,
        projectId
      )
      sendResponse(req, res, member, 200)
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

  public addProjectMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const member = await this.memberService.addProjectMember(api_key, data)
      sendResponse(req, res, member, 201)
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

  public updateProjectMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, projectId } = req.params
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const member = await this.memberService.updateProjectMember(
        api_key,
        id,
        projectId,
        data
      )
      sendResponse(req, res, member, 200)
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

  public removeProjectMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, projectId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const member = await this.memberService.removeProjectMember(
        api_key,
        id,
        projectId
      )
      sendResponse(req, res, 'Integrante eliminado correctamente', 200)
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
