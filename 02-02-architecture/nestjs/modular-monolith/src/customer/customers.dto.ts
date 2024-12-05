import { OrderDto } from "src/order/orders.dto";

export class CustomerDto {
    id: number;
    name: string;
    address?: string;
    orders?: OrderDto[]
}
