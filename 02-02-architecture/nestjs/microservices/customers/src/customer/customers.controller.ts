import { Controller, Get, Param } from '@nestjs/common';
import { CustomerDto, Order } from './customers.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }  // Inject the service

    @Get(':id')
    async getCustomerWithOrder(@Param('id') id: number): Promise<CustomerDto> {
        const customer = this.customersService.getCustomerWithOrder(id);

        // Removes address field to prevent PII leak
        const { address, ...sanitizedCustomer } = customer;

        // In monolithic implementation, we fetch customer's order by referencing Order class directly.
        //   In microservice implemntation, we fetch customer's order from the Order microservice, 
        //   which is running on a different process. We use OrderService's REST API to fetch the information.
        //   Keep in mind, that Order service runs in  port 3001 while Customer service runs in port 3000.
        const response = await fetch(`http://localhost:3001/orders/customer/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const orders: Order = await response.json();
        sanitizedCustomer.orders = orders

        return sanitizedCustomer
    }
}