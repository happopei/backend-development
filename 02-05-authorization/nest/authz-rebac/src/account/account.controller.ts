import { Request, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator'
import { UserRole } from '../auth/constants';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @Roles(UserRole.TELLER, UserRole.CUSTOMER)
  viewAccounts(@Request() req) {
    return this.accountService.getAccount(req.user.username);
  }

  @Post()
  @Roles(UserRole.TELLER)
  createCustomerAccount() {
    return this.accountService.createAccount();
  }

}
