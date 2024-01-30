import { Controller, Get, Param, Query, Req } from '@nestjs/common'
import { UsersService } from 'src/services/users.service'

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/')
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string = '', @Query('biografia') biografia: string = '') {
    return this.usersService.getUsers(page, limit, { name, biografia })
  }
}
