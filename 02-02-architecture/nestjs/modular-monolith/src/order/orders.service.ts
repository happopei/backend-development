import { Injectable } from '@nestjs/common';
import { OrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
    private readonly orders: OrderDto[] = [];

    public getCustomerOrders(customer_id: number): OrderDto[] {
        // Simulate DB call to query orders by customer_id
        const orders: OrderDto[] = [{ id: 100, customer_id: 1, product_id: "product_xyz" }]
        return orders.filter(order => order.customer_id == customer_id);
    }
}