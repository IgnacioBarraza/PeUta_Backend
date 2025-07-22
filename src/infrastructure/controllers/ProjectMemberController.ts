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
}
