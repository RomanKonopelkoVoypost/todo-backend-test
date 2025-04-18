import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const TodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  completed: z.boolean().optional().default(false),
})

export type CreateTodoInput = z.infer<typeof TodoSchema>

export const validateTodo = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const result = TodoSchema.parse(req.body)
    req.body = result
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      })
      return
    }
    next(error)
  }
}

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID format' })
    return
  }
  req.params.id = id.toString()
  next()
}
