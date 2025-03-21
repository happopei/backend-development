import { Param, Request, Controller, Post, Get, UseGuards, UseInterceptors} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ABACGuard } from '../auth/abac.guard';
import { AccountInterceptor } from './account.interceptor';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':username')
  @UseInterceptors(AccountInterceptor)  
  @UseGuards(ABACGuard)
  viewAccount(@Request() req) {
    const account = req['account'];  // The account is now available
    console.log('Account:', account);  // Log the account for debugging
    return account;
  }

  @Post()
  createCustomerAccount() {
    return this.accountService.createAccount();
  }
}
