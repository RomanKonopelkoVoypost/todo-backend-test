import { Request, Response } from 'express'
import { TodoService } from '../services/todo.service'
import { CreateTodoInput } from '../validators/todo.validator'
import { ErrorHandler } from '../utils/errorHandler'

export class TodoController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const todos = await TodoService.getAll()
      res.json(todos)
    } catch (error) {
      ErrorHandler.handleError(error, res)
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const todo = await TodoService.getById(parseInt(req.params.id))
      if (!todo) {
        return ErrorHandler.notFound('Todo not found', res)
      }
      res.json(todo)
    } catch (error) {
      ErrorHandler.handleError(error, res)
    }
  }

  static async create(req: Request<{}, {}, CreateTodoInput>, res: Response): Promise<void> {
    try {
      const todo = await TodoService.create(req.body)
      res.status(201).json(todo)
    } catch (error) {
      ErrorHandler.handleError(error, res)
    }
  }

  static async update(req: Request<{ id: string }, {}, Partial<CreateTodoInput>>, res: Response): Promise<void> {
    try {
      const todo = await TodoService.update(parseInt(req.params.id), req.body)
      if (!todo) {
        return ErrorHandler.notFound('Todo not found', res)
      }
      res.json(todo)
    } catch (error) {
      ErrorHandler.handleError(error, res)
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      await TodoService.delete(parseInt(req.params.id))
      res.status(204).send()
    } catch (error) {
      ErrorHandler.handleError(error, res)
    }
  }
}
