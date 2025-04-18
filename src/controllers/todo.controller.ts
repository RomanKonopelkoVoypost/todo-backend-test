import { Request, Response } from 'express'
import { TodoService } from '../services/todo.service'

export class TodoController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const todos = await TodoService.getAll()
      res.json(todos)
    } catch (error) {
      res.status(500).json({ error: 'Failed to get todos' })
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const todo = await TodoService.getById(parseInt(req.params.id))
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' })
        return
      }
      res.json(todo)
    } catch (error) {
      res.status(500).json({ error: 'Failed to get todo' })
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const todo = await TodoService.create(req.body)
      res.status(201).json(todo)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' })
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const todo = await TodoService.update(parseInt(req.params.id), req.body)
      res.json(todo)
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo not found') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(500).json({ error: 'Failed to update todo' })
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      await TodoService.delete(parseInt(req.params.id))
      res.status(204).send()
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo not found') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(500).json({ error: 'Failed to delete todo' })
    }
  }
}
