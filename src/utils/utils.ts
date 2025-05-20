import { CookieOptions, Request, Response } from 'express'

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
  if (cookies && cookies.length > 0) {
    cookies.forEach(cookie => {
      response.cookie(cookie.name, cookie.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        ...cookie.options,
      })
    })
  }

  return response.status(status).send(message)
}
