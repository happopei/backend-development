import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';


interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
    iat: number;
    exp: number;
  };
}


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;
    try {
      const token = authHeader.split(' ')[1];
      const user = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request.user = user; 
      return true;
    } catch (err) {
      return false;
    }
  }

}
