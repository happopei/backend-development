from typing import Optional


class Order:
    id: int
    customer_id: int
    product_id: str

    def __init__(self, id, customer_id, product_id):
        self.id = id
        self.customer_id = customer_id
        self.product_id = product_id

class OrderRepository:
    def __init__(self):
        self._orders = [
            # Order ID 100 of customer id 1
            Order(100, 1, "product_xyz")
        ]
        
    def get_orders_by_customer_id(self, customer_id: int) -> Optional[Order]:
        return [order for order in self._orders if order.customer_id == customer_id]
