import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  { id: 1, username: 'alice_teller', password: 'teller123', role: 'teller' },
  { id: 2, username: 'jane_smith', password: 'password', role: 'customer' },
  { id: 3, username: 'bob_smith', password: 'password', role: 'customer' },
  { id: 4, username: 'jane_doe', password: 'password', role: 'customer' },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = users.find(u => u.username === username && u.password === password);

    return user;
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Capture last login time 
    user.lastLogin = new Date();

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      lastLogin: user.lastLogin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}