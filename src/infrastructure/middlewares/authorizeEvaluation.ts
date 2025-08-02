import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from './authMiddleware'
import { CustomError } from './errorHandler'
import { AppDataSource } from '../orm/data-source'
import { Event } from '../../adapters/typeorm/schema/Event'

export const authorizeEvaluation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userRole } = req
    const { eventId } = req.params

    const eventRepo = AppDataSource.getRepository(Event)
    const event = await eventRepo.findOneBy({ id: eventId })

    if (!event)
      throw new CustomError('Event not found', 404, ['Evento no encontrado'])

    if (event.allow_public_evaluation && userRole !== 'visitor') {
      return next()
    }

    const allowedRoles = ['evaluator', 'admin', 'staff']
    if (allowedRoles.includes(userRole!)) {
      return next()
    }

    throw new CustomError('Not authorized to evaluate in this event', 403, [
      'No tienes permisos para evaluar en este evento',
    ])
  } catch (err) {
    next(err)
  }
}
