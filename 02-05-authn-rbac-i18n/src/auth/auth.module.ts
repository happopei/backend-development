
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard], 
  exports: [AuthService, JwtModule, JwtAuthGuard],  
})
export class AuthModule {}

