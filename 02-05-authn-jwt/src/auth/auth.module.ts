
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule,JwtService} from '@nestjs/jwt';
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
  providers: [AuthService], 
  exports: [AuthService, JwtModule],  
})
export class AuthModule {}

