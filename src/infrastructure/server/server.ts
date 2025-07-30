import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { sendResponse } from '../../utils/utils'
import { envConfig } from '../config/env-config'
import { initDatabase } from '../orm/data-source'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/UserRouter'
import { CustomError, errorHandler } from '../middlewares/errorHandler'
import { roleRouter } from './routes/RoleRouter'
import { clientRouter } from './routes/ClientRouter'
import { eventRouter } from './routes/EventRouter'
import { projectRouter } from './routes/ProjectRouter'
import { categoryRouter } from './routes/CategoryRouter'
import { memberRouter } from './routes/ProjectMemberRouter'
import { questionRouter } from './routes/EvaluationQuestionRouter'
import { formRouter } from './routes/EvaluationFormRouter'
import { answerRouter } from './routes/EvaluationAnswerRouter'
import { evaluationRouter } from './routes/ProjectEvaluationRouter'
import { exportRouter } from './routes/ExportEventRouter'

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
app.use('/api/roles', roleRouter)
app.use('/api/clients', clientRouter)
app.use('/api/events', eventRouter)
app.use('/api/projects', projectRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/members', memberRouter)
app.use('/api/forms', formRouter)
app.use('/api/questions', questionRouter)
app.use('/api/answers', answerRouter)
app.use('/api/evaluations', evaluationRouter)
app.use('/api/exports', exportRouter)

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
