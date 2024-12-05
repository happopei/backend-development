import { Injectable } from '@nestjs/common';
import { CustomerDto } from './customers.dto';

@Injectable()
export class CustomersService {
    private readonly customers: CustomerDto[] = [];

    getCustomerWithOrder(id: number): CustomerDto {
        // Simulate DB call to query single customer
        const customers: CustomerDto[] = [{ id: 1, name: "John Doe", address: "Toronto" }]

        const customer = customers.find(customer => customer.id == id);
        if (!customer) {
            throw Error("customer_not_found")
        }

        return customer
    }
}