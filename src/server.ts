import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' })
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
