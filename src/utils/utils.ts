import { CookieOptions, Request, Response } from 'express'
import { ZodError } from 'zod'

interface CookieData {
  name: string
  value: string
  options?: CookieOptions
}

export function sendResponse(
  request: Request,
  response: Response,
  message: unknown,
  status = 200,
  cookies?: CookieData[]
) {
  console.log('cookies', cookies)
  if (cookies && cookies.length > 0) {
    cookies.forEach(cookie => {
      response.cookie(cookie.name, cookie.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict',
        ...cookie.options,
      })
    })
  }

  return response.status(status).send(message)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const sanitizeError = (
  error: any
): { message: string; errors: string | object } => {
  let errorMessage = 'An unexpected error occurred'
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let sanitizedErrors: any = []

  // Manage zod errors
  if (error.errors instanceof ZodError) {
    const formattedErrors = error.errors.errors.map(
      (e: { path: any[]; message: string }) => ({
        path: e.path.join('.'),
        message: e.message,
      })
    )
    errorMessage = 'Validation error'
    sanitizedErrors = formattedErrors
  } else if (error instanceof Error) {
    errorMessage = error.message

    // Manage database and typeorm errors
    if ('query' in error) {
      sanitizedErrors = ['A database error occurred']
    } else {
      sanitizedErrors = error.stack ? error.stack.split('\n').slice(0, 2) : []
    }
  }

  return { message: errorMessage, errors: sanitizedErrors }
}
