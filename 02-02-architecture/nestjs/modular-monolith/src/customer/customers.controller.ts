import { Controller, Get, Param } from '@nestjs/common';
import { CustomerDto } from './customers.dto';
import { CustomersService } from './customers.service';
import { OrdersService } from '../order/orders.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService, private readonly ordersService: OrdersService) { }  // Inject the service

    @Get(':id')
    getCustomerWithOrder(@Param('id') id: number): CustomerDto {
        const customer = this.customersService.getCustomerWithOrder(id);

        // Removes address field to prevent PII leak
        const { address, ...sanitizedCustomer } = customer;

        // Join customer order field. 
        // Technically, we could also query this in one go via SQL query,
        //   but let's assume noSql query just for example.
        const customer_orders = this.ordersService.getCustomerOrders(id);
        sanitizedCustomer.orders = customer_orders

        return sanitizedCustomer
    }
}