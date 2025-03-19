import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    this.logger.log(`Login attempt for user: ${body.username}`);
    
    return this.authService.login(body.username, body.password);
  }
}
