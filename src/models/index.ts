import sequelize from '../config/database'
import Todo from './todo.model'

const models = {
  Todo,
}

// Sync all models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
    console.log('Database synchronized successfully')
  } catch (error) {
    console.error('Error synchronizing database:', error)
  }
}

export { models, syncDatabase }
