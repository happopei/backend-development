import { Request, Controller, Post, Get, UseGuards, UseInterceptors} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ABACGuard } from '../auth/abac.guard';
import { ABAC } from '../auth/abac.decorator';

@Controller('accounts')
 
@UseGuards(JwtAuthGuard,ABACGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':accountId')
  @ABAC('account') 
  viewAccount(@Request() req) {
    const account = req['account'];  
    return account;
  }

  @Post()
  createCustomerAccount() {
    return this.accountService.createAccount();
  }
}
