import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BookingController],
})
export class BookingModule {}