import Permission from './permissions.entity'

import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'

export default interface User {
  id: number

  userName: string
  email: string

  firstName: string
  lastName: string

  avatarUrl: string

  password: string
  permissions: Permission[]

  birthday: Date

  createdAt: Date
}

const CreateUserSchema = z.object({
  userName: z.string().min(3).max(16),
  email: z.string().email(),

  firstName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(64),

  password: z.string().min(8)
})

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
