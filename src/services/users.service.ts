import User, { type CreateUserDto } from 'src/entities/users.entity'
import { Injectable } from '@nestjs/common'
import UserNotFoundException from 'src/exceptions/UserNotFoundException'

@Injectable()
export class UsersService {

  private users: User[] = [
    {
      id: 1,

      userName: 'Sylvininho',
      firstName: 'Sylvino',
      lastName: 'Prevot',

      email: 'sylvininholol@email.com',
      password: 'sylvino123',

      birthday: new Date(),
      avatarUrl: 'https://lightshot.com.br',
      permissions: [],

      createdAt: new Date(),
    },
  ]

  getUserById(id: number): User {
    return this.users.find((user) => user.id === id)
  }

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

  deleteUser(id: number) {
    const user: User = this.getUserById(id)

    if (!user) {
      throw new UserNotFoundException('The user ' + id + ' not found.')
    }

    this.users.splice(this.users.indexOf(user), 1)
  }
}
