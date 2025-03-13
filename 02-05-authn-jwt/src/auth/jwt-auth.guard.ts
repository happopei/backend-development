import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;
    try {
      request['user'] = this.jwtService.verifyAsync(authHeader.split(' ')[1], {
        secret: jwtConstants.secret,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
