import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerDto } from './customers.dto';
import { OrdersService } from 'src/order/orders.service';

@Module({
    imports: [],
    controllers: [CustomersController],
    providers: [CustomersService, OrdersService],
})
export class CustomersModule {

}