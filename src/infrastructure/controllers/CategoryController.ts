import { NextFunction, Request, Response } from 'express'
import { CategoryService } from '../../core/services/CategoryService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'
import { getApiKeyFromHeaders } from '../../utils/apikeyUtils'

export class CategoryController {
  private categoryService: CategoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService
  }

  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const api_key = getApiKeyFromHeaders(req)
      const categories = await this.categoryService.getAllCategories(api_key)
      sendResponse(req, res, categories, 200)
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

  public getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const category = await this.categoryService.getCategoryById(id, api_key)
      sendResponse(req, res, category, 200)
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

  public getCategoriesByEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { eventId } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      const categories = await this.categoryService.getCategoriesByEvent(
        api_key,
        eventId
      )
      sendResponse(req, res, categories, 200)
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

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const category = await this.categoryService.createCategory(api_key, data)
      sendResponse(req, res, category, 200)
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

  public updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    const data = req.body
    try {
      const api_key = getApiKeyFromHeaders(req)
      const category = await this.categoryService.updateCategory(
        api_key,
        id,
        data
      )
      sendResponse(req, res, category, 200)
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

  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params
    try {
      const api_key = getApiKeyFromHeaders(req)
      await this.categoryService.deleteCategory(api_key, id)
      sendResponse(req, res, 'Categoria eliminada correctamente', 204)
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
}
