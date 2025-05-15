import { Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ABACGuard } from '../auth/abac.guard';
import { ABAC } from '../auth/abac.decorator';
import { UserRole } from 'src/auth/constants';

@Controller('accounts')
@UseGuards(JwtAuthGuard, ABACGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get(':accountId')
  @ABAC(UserRole.TELLER, UserRole.CUSTOMER)
  viewAccount(@Param('accountId') accountId: number) {
    const account = this.accountService.getAccount(accountId)
    return account;
  }

  @Post()
  createCustomerAccount() {
    return this.accountService.createAccount();
  }
}
