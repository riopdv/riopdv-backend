import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Session } from 'src/entities/users.entity';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(readonly usersService: UsersService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']

    if (!token) throw new HttpException('Token not found.', HttpStatus.UNAUTHORIZED)

    const payload: Session = await this.usersService.getPayloadFromToken(token)

    if (payload.expiresAt < Date.now()) throw new HttpException('Your token has expired.', HttpStatus.UNAUTHORIZED)

    const { id } = payload

    const user = this.usersService.getUser({ id })

    if (!user) {
      throw new HttpException("User not exists", HttpStatus.UNAUTHORIZED)
    }

    request.headers['user'] = user
    return true;
  }

}