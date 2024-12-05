import { Controller, Get, Param } from '@nestjs/common';
import { OrderDto } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }  // Inject the service

    @Get(':id')
    getCustomerOrders(@Param('id') id: number): OrderDto[] {
        return this.ordersService.getCustomerOrders(id);
    }
}