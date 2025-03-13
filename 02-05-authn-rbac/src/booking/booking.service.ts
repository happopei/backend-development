import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
  private bookings = [
    { id: 1, user: 'user1', details: 'Flight to Toronto' },
    { id: 2, user: 'user', details: 'Flight to Quebec' },
    { id: 2, user: 'user2', details: 'Flight to Vancouver' },
  ];

  getAllBookings() {
    return this.bookings; // Only Admin & Manager can access
  }

  getUserBookings(user: string) {
    return this.bookings.filter(booking => booking.user === user); // Users see only their own bookings
  }
}
