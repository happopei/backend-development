import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  private accounts = [
    { id: 1, customer: 'jane_doe', account_id: 'AA123', account_type: "chequing", balance: 1000.00 },
    { id: 2, customer: 'jane_doe', account_id: 'BA456', account_type: "savings", balance: 5000.00 },
    { id: 3, customer: 'jane_smith', account_id: 'BA344', account_type: "savings", balance: 5000.00 },
  ];

  getAccount() {
    return this.accounts;
  }

  createAccount() {
    return "Account successfully created.";
  }

}
