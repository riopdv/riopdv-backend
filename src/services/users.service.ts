import User, { type CreateUserDto } from 'src/entities/users.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,

      userName: 'Sylvininho',
      firstName: 'Sylvino',
      lastName: 'Prevot',

      email: 'sylvino@email.com',
      password: 'sylvino123',

      birthday: new Date(),
      avatarUrl: 'https://lightshot.com.br',
      permissions: [],

      createdAt: new Date(),
    },
  ]

  getUsers(page: number, limit: number, filters: { [key: string]: string }): User[] {
    return this.users
  }

  createUser(createUserDto: CreateUserDto): User {
    const { userName, email, firstName, lastName, password } = createUserDto

    const user: User = {
      id: this.users.length + 1,

      userName,
      firstName,
      lastName,

      email,
      password,

      birthday: new Date(),
      avatarUrl: 'https://lightshot.com.br',
      permissions: [],

      createdAt: new Date(),
    }

    this.users.push(user)
    return user
  }
}
