import { TodoService } from '../../services/todo.service'
import Todo from '../../models/todo.model'

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

jest.mock('../../utils/errorHandler', () => ({
  ErrorHandler: {
    handleError: jest.fn().mockImplementation((error) => {
      throw error
    }),
    notFound: jest.fn().mockImplementation((message) => {
      throw new Error(message)
    }),
    badRequest: jest.fn().mockImplementation((message) => {
      throw new Error(message)
    }),
  },
}))

describe('TodoService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('retrieves and returns a list of todos from the database', async () => {
      const mockTodos = [
        {
          id: 1,
          title: 'Test Todo',
          description: 'Test Description',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      ;(Todo.findAll as jest.Mock).mockResolvedValue(mockTodos)

      const result = await TodoService.getAll()
      expect(result).toEqual(mockTodos)
      expect(Todo.findAll).toHaveBeenCalled()
    })
  })

  describe('create', () => {
    it('creates a new todo with valid data and returns the created todo', async () => {
      const todoData = {
        title: 'New Todo',
        description: 'New Description',
        completed: false,
      }
      const mockTodo = {
        id: 1,
        ...todoData,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ;(Todo.create as jest.Mock).mockResolvedValue(mockTodo)

      const result = await TodoService.create(todoData)
      expect(result).toEqual(mockTodo)
      expect(Todo.create).toHaveBeenCalledWith(todoData)
    })
  })

  describe('update', () => {
    it('updates an existing todo and returns the updated todo', async () => {
      const todoData = {
        title: 'Updated Todo',
        description: 'Updated Description',
        completed: true,
      }
      const mockTodo = {
        id: 1,
        ...todoData,
        createdAt: new Date(),
        updatedAt: new Date(),
        update: jest.fn().mockResolvedValue({ ...todoData, id: 1 }),
      }
      ;(Todo.findByPk as jest.Mock).mockResolvedValue(mockTodo)

      const result = await TodoService.update(1, todoData)
      expect(result).toEqual({ ...todoData, id: 1 })
      expect(Todo.findByPk).toHaveBeenCalledWith(1)
      expect(mockTodo.update).toHaveBeenCalledWith(todoData)
    })
  })

  describe('delete', () => {
    it('deletes an existing todo', async () => {
      const mockTodo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        destroy: jest.fn().mockResolvedValue(true),
      }
      ;(Todo.findByPk as jest.Mock).mockResolvedValue(mockTodo)

      await TodoService.delete(1)
      expect(Todo.findByPk).toHaveBeenCalledWith(1)
      expect(mockTodo.destroy).toHaveBeenCalled()
    })
  })
})
