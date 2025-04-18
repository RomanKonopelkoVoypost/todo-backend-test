import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { syncDatabase } from './models'
import apiRoutes from './routes'

export const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize database connection
syncDatabase()

// API Routes
app.use('/api', apiRoutes)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' })
})

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
  })
}
