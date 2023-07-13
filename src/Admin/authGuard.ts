/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, private reflector: Reflector, private configService: ConfigService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(this.configService.get('secretKey'), [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('secretKey'),
    });
    if (token && payload.isAdmin == true) {
        request['user'] = payload;
      }
      else{
        throw new UnauthorizedException("User is not authorized");
      }
      return true;
  }
  private async extractTokenFromHeader(request: Request): Promise<string | undefined> {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return token
  }

}
