import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRETS } from '../auth/constants'
import { ConfigModule } from '@nestjs/config'
import { UsersController } from 'src/controllers/users.controller';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRETS,
      signOptions: { expiresIn: '14d' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
