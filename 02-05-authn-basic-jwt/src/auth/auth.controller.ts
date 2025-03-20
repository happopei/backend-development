
import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    this.logger.log(`Login attempt for user: ${body.password}`);
    return this.authService.login(body.username, body.password);
  }
}
