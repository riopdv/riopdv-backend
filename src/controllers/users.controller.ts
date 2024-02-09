import UserNotFoundException from 'src/exceptions/UserNotFoundException'
import User, { CreateUserDto, UserDto, UserLoginDto } from 'src/entities/users.entity'
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UsePipes, Request, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from 'nestjs-zod'
import { UsersService } from 'src/services/users.service'
import WrongPasswordException from 'src/exceptions/WrongPasswordException'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @UsePipes(ZodValidationPipe)
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto): UserDto {
    const { userName, email } = createUserDto

    const user: User = this.usersService.getUser({ userName, email }, true)

    if (user) {
      throw new HttpException('There are a user with same informations', HttpStatus.CONFLICT)
    }

    return this.usersService.createUser(createUserDto)
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get('/profile')
  async profile(@Request() req) {
    return req.headers['user']
  }
}
