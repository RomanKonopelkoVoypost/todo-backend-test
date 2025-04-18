import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { apiLimiter, errorMiddleware, requestLogger } from './middlewares'

import v1Routes from './routes/v1'

const app = express()

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(compression())

app.use(requestLogger)

app.use(apiLimiter)

app.use('/api/v1', v1Routes)

app.use(errorMiddleware)

export default app
