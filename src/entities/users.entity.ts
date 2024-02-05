import Permission from './permissions.entity'

import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'

export default interface User extends UserDto {
  password: string
}

export interface UserDto {
  id: number

  userName: string
  email: string

  firstName: string
  lastName: string

  avatarUrl: string

  permissions: Permission[]

  birthday: Date

  createdAt: Date
}

const UserLoginSchema = z.object({
  userName: z.string(),
  password: z.string(),
})

export class UserLoginDto extends createZodDto(UserLoginSchema) {}

const CreateUserSchema = z.object({
  userName: z.string().min(3).max(16),
  email: z.string().email(),

  firstName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(64),

  password: z.string().min(8),
})

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
