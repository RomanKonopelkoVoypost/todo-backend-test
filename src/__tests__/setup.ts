import { config } from 'dotenv'

// Load environment variables
config({ path: '.env' })

// Mock database connection
jest.mock('../config/database', () => ({
  sequelize: {
    sync: jest.fn().mockResolvedValue(undefined),
  },
}))

// This is a setup file for tests
test('setup', () => {
  expect(true).toBe(true)
})
