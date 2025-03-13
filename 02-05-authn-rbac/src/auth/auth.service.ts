import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './constants';

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: [UserRole.ADMIN] },
  { id: 2, username: 'manager', password: 'manager123', role: [UserRole.MANAGER] },
  { id: 3, username: 'user', password: 'user123', role: [UserRole.USER] },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = users.find(u => u.username === username && u.password === password);
    return user;
  }
}

