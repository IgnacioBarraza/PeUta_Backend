import { Request, Response } from 'express'

export function sendResponse(
  request: Request,
  response: Response,
  message: any,
  status = 200
) {
  return response.status(status).send(message)
}
