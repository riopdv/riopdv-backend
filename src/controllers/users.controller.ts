import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'nestjs-zod'
import User, { CreateUserDto, UserDto } from 'src/entities/users.entity'
import UserNotFoundException from 'src/exceptions/UserNotFoundException'
import { UsersService } from 'src/services/users.service'

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) { }

  @Get('/')
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string = '', @Query('biografia') biografia: string = ''): UserDto[] {
    const users: User[] = this.usersService.getUsers(page, limit, { name, biografia })

    if (users.length === 0) {
      throw new HttpException('No users found.', HttpStatus.NOT_FOUND)
    }

    return users.map((user) => {
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
}

