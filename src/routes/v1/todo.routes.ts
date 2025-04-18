import { Router } from 'express'
import { TodoController } from '../../controllers/todo.controller'
import { validateTodo, validateId } from '../../validators/todo.validator'

const router = Router()

router.get('/todos', TodoController.getAll)
router.get('/todos/:id', validateId, TodoController.getById)
router.post('/todos', validateTodo, TodoController.create)
router.put('/todos/:id', validateId, validateTodo, TodoController.update)
router.delete('/todos/:id', validateId, TodoController.delete)

export default router
