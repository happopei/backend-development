export class CustomerDto {
    id: number;
    name: string;
    address?: string;
    orders?: Order
}

// We have to duplicate this here because we do not want tight dependency with Order component/microservice
export class Order {
    id: number;
    customer_id: number;
    product_id: string;
}