import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { sendResponse } from '../../utils/utils'
import { envConfig } from '../config/env-config'
import { initDatabase } from '../orm/data-source'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/healthy', (req: Request, res: Response) => {
  sendResponse(req, res, 'OK', 200)
})

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