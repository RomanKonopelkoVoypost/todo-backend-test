import Todo from '../models/todo.model'
import { CreationAttributes } from 'sequelize'

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

  static async create(data: CreationAttributes<Todo>) {
    return Todo.create(data)
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
