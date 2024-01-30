import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRETS } from '../auth/constants'
import { ConfigModule } from '@nestjs/config'

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
