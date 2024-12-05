import { Injectable } from '@nestjs/common';
import { CustomerDto, OrderDto } from './app.dto';

@Injectable()
export class AppService {
  getCustomerWithOrder(id: number): CustomerDto {

    // Simulate DB call to query single customer
    const customers: CustomerDto[] = [{ id: 1, name: "John Doe", address: "Toronto" }]

    const customer = customers.find(customer => customer.id == id);
    if (!customer) {
      throw Error("customer_not_found")
    }

    return customer
  }

  getCustomerOrders(customer_id: number): OrderDto[] {
    // Simulate DB call to query orders by customer_id
    const orders: OrderDto[] = [{ id: 100, customer_id: 1, product_id: "product_xyz" }]
    return orders.filter(order => order.customer_id == customer_id);
  }
}
