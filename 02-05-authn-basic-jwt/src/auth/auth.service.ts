import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  { id: 1, username: 'jane_doe', password: 'password' },
  { id: 2, username: 'alice_teller', password: 'teller123' },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private async validateUser(username: string, password: string): Promise<any> {
    const user = users.find(u => u.username === username && u.password === password);

    return user;
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const validatedUser = await this.validateUser(username, password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: validatedUser.username, sub: validatedUser.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}