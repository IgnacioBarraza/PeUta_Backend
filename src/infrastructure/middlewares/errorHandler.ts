import { Request, Response } from 'express'
import { sendResponse } from '../../utils/utils'

export class CustomError extends Error {
  statusCode: number
  errors?: string | object

  constructor(message: string, statusCode: number, errors?: string | object) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response
): void => {
  const statusCode = err.statusCode || 500
  const response = {
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  }
  sendResponse(req, res, response, statusCode)
}
