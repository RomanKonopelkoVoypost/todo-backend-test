import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { syncDatabase } from './models'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize database connection
syncDatabase()

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' })
})

// Start server
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
