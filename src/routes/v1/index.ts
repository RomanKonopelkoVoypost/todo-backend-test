import { Router } from 'express'
import { TodoController } from '../../controllers/todo.controller'

const router = Router()

// API Documentation
router.get('/', (req, res) => {
  res.json({
    version: 'v1',
    documentation: '/api/v1/docs',
    resources: {
      todos: {
        base: '/api/v1/todos',
        endpoints: {
          list: 'GET /api/v1/todos',
          create: 'POST /api/v1/todos',
          get: 'GET /api/v1/todos/:id',
          update: 'PUT /api/v1/todos/:id',
          delete: 'DELETE /api/v1/todos/:id',
        },
      },
    },
  })
})

router.get('/todos', TodoController.getAll)
router.post('/todos', TodoController.create)
router.get('/todos/:id', TodoController.getById)
router.put('/todos/:id', TodoController.update)
router.delete('/todos/:id', TodoController.delete)

export default router
