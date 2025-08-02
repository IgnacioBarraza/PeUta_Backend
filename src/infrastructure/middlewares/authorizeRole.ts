import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from './authMiddleware'
import { CustomError } from './errorHandler'

export function authorizeRoles(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.userRole

    if (!userRole) {
      return next(
        new CustomError('Invalid token data', 401, [
          'No se pudo determinar tu rol de usuario',
        ])
      )
    }

    if (!allowedRoles.includes(userRole)) {
      return next(
        new CustomError('Not authorized', 403, [
          'No tienes permisos para acceder a esta ruta',
        ])
      )
    }

    next()
  }
}
