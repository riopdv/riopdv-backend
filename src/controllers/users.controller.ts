import { Body, Controller, Get, Param, Post, Query, Req, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'nestjs-zod'
import User, { CreateUserDto } from 'src/entities/users.entity'
import { UsersService } from 'src/services/users.service'

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/')
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string = '', @Query('biografia') biografia: string = '') {
    return this.usersService.getUsers(page, limit, { name, biografia })
  }

  @UsePipes(ZodValidationPipe)
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto)
  }
}
