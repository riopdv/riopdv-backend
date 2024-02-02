import UserNotFoundException from 'src/exceptions/UserNotFoundException'
import User, { CreateUserDto, UserDto, UserLoginDto } from 'src/entities/users.entity'
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, UsePipes, Request } from '@nestjs/common'
import { ZodValidationPipe } from 'nestjs-zod'
import { UsersService } from 'src/services/users.service'
import WrongPasswordException from 'src/exceptions/WrongPasswordException'
import { JWT_SECRETS } from 'src/auth/constants'

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/')
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string = '', @Query('biografia') biografia: string = ''): UserDto[] {
    const users: User[] = this.usersService.getUsers(page, limit, { name, biografia })

    if (users.length === 0) {
      throw new HttpException('No users found.', HttpStatus.NOT_FOUND)
    }

    return users.map(user => {
      const { password, ...rest } = user
      return rest
    })
  }

  @UsePipes(ZodValidationPipe)
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto): UserDto {
    return this.usersService.createUser(createUserDto)
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      this.usersService.deleteUser(id)
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND)
      }
    }
  }

  @UsePipes(ZodValidationPipe)
  @Post('/login')
  async loginUser(@Body() userLoginDto: UserLoginDto): Promise<string> {
    try {
      const token: string = await this.usersService.createSession(userLoginDto)
      return token
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND)
      } else if (err instanceof WrongPasswordException) {
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED)
      } else {
        console.log(err)
      }
    }
  }

  @Get('/profile')
  async profile(@Request() req) {
    const token = req.headers['authorization']

    if (!token) throw new HttpException('Token not found.', HttpStatus.UNAUTHORIZED)

    const payload = await this.usersService.getPayloadFromToken(token)

    if (payload.exp < Date.now()) throw new HttpException('Token expired.', HttpStatus.UNAUTHORIZED)
    // token ainda está valido

    const { id } = payload

    const user = this.usersService.getUser({ key: 'id', value: id })

    return user
  }
}
