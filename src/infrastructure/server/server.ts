import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { sendResponse } from '../../utils/utils'
import { config } from 'dotenv'

config()

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use('/healthy', (req: Request, res: Response) => {
  sendResponse(req, res, 'OK', 200)
})

const { PORT } = process.env
app.listen(PORT || 4000, () => {
  console.log(`🚀🚀 Server running on port: ${PORT} 🚀🚀`)
})