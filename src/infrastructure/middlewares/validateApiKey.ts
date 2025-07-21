import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../orm/data-source'
import { Client } from '../../adapters/typeorm/schema/Client'
import { CustomError } from './errorHandler'

export async function validateApiKEy(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const api_key = req.header('x-api-key')

  if (!api_key)
    next(new CustomError('Missing api key', 401, ['Missing api key']))

  try {
    const clientRepo = AppDataSource.getRepository(Client)
    const client = await clientRepo.findOneBy({ api_key })

    if (!client)
      next(new CustomError('INVALID API KEY', 401, ['INVALID API KEY']))
    ;(req as any).client = client

    next()
  } catch (error) {
    console.error(error)
    next(new CustomError('Internal server error', 500, [error]))
  }
}
