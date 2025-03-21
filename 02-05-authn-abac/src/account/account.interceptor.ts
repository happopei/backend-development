// account.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class AccountInterceptor implements NestInterceptor {
  constructor(private readonly accountService: AccountService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log ("I'm here!")
    const accountId = request.params.username;
    console.log(accountId);
    const account = await this.accountService.getAccount(accountId);

    if (!account) {
      throw new Error('Account not found');
    }

    request['account'] = account; 

    return next.handle();  // Proceed to the next handler (ABAC Guard)
  }
}