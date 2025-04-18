import Todo from '../models/todo.model'
import { CreationAttributes } from 'sequelize'

interface CreateTodoData {
  title: string
  description?: string
  completed?: boolean
}

interface UpdateTodoData {
  title?: string
  description?: string
  completed?: boolean
}

export class TodoService {
  static async getAll() {
    return Todo.findAll()
  }

  static async getById(id: number) {
    return Todo.findByPk(id)
  }

  static async create(data: CreateTodoData) {
    return Todo.create(data as CreationAttributes<Todo>)
  }

  static async update(id: number, data: UpdateTodoData) {
    const todo = await Todo.findByPk(id)
    if (!todo) throw new Error('Todo not found')
    return todo.update(data)
  }

  static async delete(id: number) {
    const todo = await Todo.findByPk(id)
    if (!todo) throw new Error('Todo not found')
    return todo.destroy()
  }
}
