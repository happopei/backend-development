import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customer/customers.module';
import { OrdersModule } from './order/orders.module';

@Module({
  imports: [CustomersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }