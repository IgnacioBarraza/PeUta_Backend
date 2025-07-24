import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env-config'
import { CustomError } from './errorHandler'

export interface AuthenticatedRequest extends Request {
  userId?: string
  userRole?: string
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1] // "Bearer <token>"

  if (!token)
    throw new CustomError('Token no proporcionado', 401, [
      'Token no proporcionado',
    ])

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret as string) as {
      user: string
      identifier: string
      role: string
    }

    req.userId = decoded.user
    req.userRole = decoded.role

    next()
  } catch (error) {
    next(
      new CustomError('Token invalido o expirado', 403, [
        'Token invalido o expirado',
      ])
    )
  }
}
