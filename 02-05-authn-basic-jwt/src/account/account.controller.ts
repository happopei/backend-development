import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  viewAccounts() {
    return this.accountService.getAccount();
  }

  @Post()
  createCustomerAccount() {
    return this.accountService.createAccount();
  }

}
