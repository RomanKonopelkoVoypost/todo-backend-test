import Todo from '../models/todo.model'
import { CreationAttributes } from 'sequelize'
import { CreateTodoInput } from '../validators/todo.validator'

export class TodoService {
  static async getAll(): Promise<Todo[]> {
    return Todo.findAll()
  }

  static async getById(id: number): Promise<Todo | null> {
    return Todo.findByPk(id)
  }

  static async create(data: CreateTodoInput): Promise<Todo> {
    return Todo.create(data as CreationAttributes<Todo>)
  }

  static async update(id: number, data: Partial<CreateTodoInput>): Promise<Todo | null> {
    const todo = await Todo.findByPk(id)
    if (!todo) return null
    return todo.update(data)
  }

  static async delete(id: number): Promise<number | null> {
    const todo = await Todo.findByPk(id)
    if (!todo) return null
    await todo.destroy()
    return 1
  }
}
