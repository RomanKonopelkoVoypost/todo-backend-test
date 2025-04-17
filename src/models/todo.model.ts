import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database'

interface TodoAttributes {
  id: number
  title: string
  description?: string
  completed: boolean
  createdAt?: Date
  updatedAt?: Date
}

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number
  public title!: string
  public description?: string
  public completed!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
  }
)

export default Todo
