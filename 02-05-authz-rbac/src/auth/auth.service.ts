import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  { id: 1, username: 'alice_teller', password: 'teller123', role: 'teller'},
  { id: 2, username: 'jane_smith', password: 'password', role: 'customer' },
  { id: 3, username: 'bob_smith', password: 'password', role: 'customer' },
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
    const payload = { username: validatedUser.username, sub: validatedUser.id, role: validatedUser.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}