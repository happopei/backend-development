import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  private bookings = [
    { id: 1, user: 'user1', flight: 'AA123', destination: 'NYC' },
    { id: 2, user: 'user2', flight: 'BA456', destination: 'LON' },
  ];

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.bookings;
  }
}