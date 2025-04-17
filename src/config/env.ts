import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  DATABASE_URL: z.string().url(),
})

type Env = z.infer<typeof envSchema>

console.log(process.env)

const env = envSchema.parse(process.env)

export { env, type Env }
