import { randomBytes } from 'crypto'
import { Request } from 'express'
import { CustomError } from '../infrastructure/middlewares/errorHandler'

export function generateApiKey(length = 20): string {
  return randomBytes(length).toString('hex')
}

export function getApiKeyFromHeaders(req: Request): string {
  const api_key = req.headers['x-api-key'] as string
  if (!api_key) throw new CustomError('API key missing in request headers', 400)

  return api_key
}
