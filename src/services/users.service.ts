import UserNotFoundException from 'src/exceptions/UserNotFoundException'
import WrongPasswordException from 'src/exceptions/WrongPasswordException'
import User, { UserLoginDto, type CreateUserDto } from 'src/entities/users.entity'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(readonly jwtService: JwtService) {}

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

  getUser(filters: { [key in keyof User]?: User[key] }, or: boolean = false) {
    if (or) {
      return this.users.find(user => Object.keys(filters).some(key => filters[key] === user[key]))
    }

    return this.users.find(user => Object.keys(filters).every(key => filters[key] === user[key]))
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
    const user: User = this.getUser({ id })

    if (!user) {
      throw new UserNotFoundException('The user ' + id + ' not found.')
    }

    this.users.splice(this.users.indexOf(user), 1)
  }

  async createSession(userLoginDto: UserLoginDto): Promise<string> {
    const { userName, password } = userLoginDto

    const user: User | null = this.getUser({ userName })

    if (!user) {
      throw new UserNotFoundException('The user not found.')
    }

    if (user.password !== password) {
      throw new WrongPasswordException()
    }

    const payload = { id: user.id }
    return await this.jwtService.signAsync(payload)
  }

  async getPayloadFromToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token)
  }
}
