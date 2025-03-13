import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(username: string, password: string): any {
    if (username === 'user' && password === 'password') {
      return { userId: 1, username };
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
