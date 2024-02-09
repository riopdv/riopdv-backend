import { z } from 'zod'

export function validate(config: Record<string, unknown>) {
  const validationSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    JWT_SECRET: z.string().default('secret'),
    DATABASE_URL: z.string().url(),
  })

  return validationSchema.parse(config)
}
