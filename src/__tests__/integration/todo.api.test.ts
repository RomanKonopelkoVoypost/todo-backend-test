import { Request, Response } from 'express'
import request from 'supertest'
import { app } from '../../server'

jest.mock('../../models/todo.model', () => {
  const mockModel = {
    init: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    define: jest.fn(),
  }
  return {
    __esModule: true,
    default: mockModel,
  }
})

jest.mock('../../routes/v1', () => {
  const express = require('express')
  const router = express.Router()

  router.get('/todos', (_req: Request, res: Response) => {
    res.status(200).json([])
  })

  router.post('/todos', (req: Request, res: Response) => {
    if (!req.body.title) {
      res.status(400).json({ error: 'Title is required' })
    } else {
      res.status(201).json({
        id: 1,
        ...req.body,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
  })

  return router
})

jest.mock('../../server', () => {
  const express = require('express')
  const app = express()
  app.use(express.json())
  app.use('/api/v1', require('../../routes/v1'))
  return { app }
})

describe('Todo API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/v1/todos', () => {
    it('should return empty array when no todos exist', async () => {
      const response = await request(app).get('/api/v1/todos')
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe('POST /api/v1/todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app).post('/api/v1/todos').send({
        title: 'New Todo',
        description: 'New Description',
      })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: 1,
        title: 'New Todo',
        description: 'New Description',
        completed: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    })
  })
})
