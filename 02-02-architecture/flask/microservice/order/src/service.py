from typing import Dict, Any, List, Tuple
from order.model import OrderRepository, Order

class OrderService:
    def __init__(self):
        self.order_repository = OrderRepository()
    
    def get_orders_by_customer(self, customer_id: int) -> List[Order]:
        return self.order_repository.get_orders_by_customer_id(customer_id)
