import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { sendResponse } from '../../utils/utils'
import { envConfig } from '../config/env-config'
import { initDatabase } from '../orm/data-source'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/UserRouter'
import { CustomError, errorHandler } from '../middlewares/errorHandler'

const app = express()

/**
 * Server configuration
 */

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

/**
 * Routes
 */

app.use('/api/users', userRouter)

app.use('/healthy', (req: Request, res: Response) => {
  sendResponse(req, res, 'OK', 200)
})

/**
 * Middlewares
 */

app.use(
  (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, req, res)
  }
)

/**
 * Datataba init
 */

initDatabase()
  .then(() => {
    console.log('Database initialized and connected')
    app.listen(envConfig.port || 4000, () => {
      console.log(`🚀🚀 Server running on port: ${envConfig.port} 🚀🚀`)
    })
  })
  .catch(error => {
    console.error('Error initializing database', error)
    process.exit(1)
  })
