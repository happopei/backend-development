import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get('user')
  @Roles(UserRole.USER)
  getUserBookings(@Request() req) {
    console.log("Request", req);
    return this.bookingService.getUserBookings(req.user.username);
  }
}
