import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import JWTService from '../services/jwt.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private jwtService: JWTService;

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.jwtService = this.moduleRef.get(JWTService, { strict: false });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['authorization'];
    if (!accessToken) throw new UnauthorizedException('Token required');
    const jwt = accessToken.split(' ')[1];

    try {
      const payload = this.jwtService.decodeJWT(jwt, 'access');
      if (payload.invalid) {
        throw new UnauthorizedException('Unauthorized');
      } else {
        request.userId = payload.info.data.id;
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
