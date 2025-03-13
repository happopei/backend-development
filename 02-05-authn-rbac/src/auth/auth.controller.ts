
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {
    console.log('AuthController is loaded');
  }

  @Post('login')
  login(@Body() body) {
    this.logger.log('Login endpoint hit'); // ✅ Debugging log
    const user = this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}

