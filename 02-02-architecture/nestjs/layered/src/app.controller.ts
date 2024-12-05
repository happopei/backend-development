import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerDto } from './app.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('api/customers/:id')
    getCustomerWithOrder(@Param('id') id: number): CustomerDto {
        const customer = this.appService.getCustomerWithOrder(id);

        // Removes address field to prevent PII leak
        const { address, ...sanitizedCustomer } = customer;

        // Join customer order field. 
        // Technically, we could also query this in one go via SQL query,
        //   but let's assume noSql query just for example.
        const customer_orders = this.appService.getCustomerOrders(id);
        sanitizedCustomer.orders = customer_orders

        return sanitizedCustomer
    }
}
