// guards/abac.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ABACGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // User information from the JWT
    const account = request.account;  // Resource being accessed

    return this.isUserAuthorized(user, account);
  }

  private isUserAuthorized(user: any, account: any): boolean {
    // Define dynamic ABAC rules

    // Rule: Customers can only access their own account
    if (account && user.role == 'customer' && account.username !== user.username) {
      return false; // Deny if trying to access another customer's account
    }

    // Rule: Allow tellers to access only during business hours (9 AM to 5 PM)
    const currentHour = new Date().getHours();
    if (user.role == 'teller' && currentHour < 9 || currentHour > 17) {
      return false; // Deny if the request is outside of business hours
    }

    return true; // Allow access
  }
}
