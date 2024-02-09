import { validate } from 'src/utils/configuration'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { UsersController } from 'src/controllers/users.controller'
import { UsersService } from 'src/services/users.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    JwtModule.register({
      global: true,
      secret: 'asdaweaw',
      signOptions: { expiresIn: '14d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
