// guards/abac.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ABAC_KEY } from './abac.decorator';
import { AccountService } from '../account/account.service';

@Injectable()
export class ABACGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountService: AccountService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // User information from the JWT
    const httpMethod = request.method; 
    const resourceType = this.reflector.get<string>(ABAC_KEY, context.getHandler()) || 
    this.reflector.get<string>(ABAC_KEY, context.getClass());     // Get the resource type from the controller metadata

    // Define dynamic ABAC rules

    // Rule: Customers can only access their own account
    // Rule: Tellers can access other customer's accounts
    if (httpMethod == 'GET'){
      // Handle different resource types
      if (resourceType === 'account') {
        const accountId = request.params.accountId;
        const account = await this.accountService.getAccount(accountId); // Fetch the account directly in the guard
        
        if (!account) {
          return false;
        }
        request.account = account;
        return this.isUserAuthorizedView(user, account);
      }
    }

    // Rule: Access only by tellers. 
    // Rule: Tellers can create an account during business hours (9 AM to 5 PM)
    if (httpMethod == 'POST'){
      return this.isUserAuthorizedCreate(user);
    }

    return true; //All checks pass
  }

  private isUserAuthorizedView(user: any, account: any): boolean {
        if (user.role == 'customer' && account.customer !== user.username) {
          console.log("Customers can only access their own account");
          return false; // Deny if trying to access another customer's account
        }

    return true; // Allow if all checks pass
  }

  private isUserAuthorizedCreate(user: any): boolean {
    const currentHour = new Date().getHours();
    if (user.role != 'teller' || currentHour < 9 || currentHour > 17) {
      console.log("Allow tellers to access only during business hours (9 AM to 5 PM)");
      return false; // Deny if the request is outside of business hours
    }
    return true; // Allow if all checks pass
  }
}
