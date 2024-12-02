from typing import Dict, Any, List, Tuple

from customer.model import CustomerRepository, Customer
from order.model import OrderRepository, Order

class CustomerService:
    def __init__(self):
        self.customer_repository = CustomerRepository()
        self.order_repository = OrderRepository()
    
    def get_by_id(self, id: int) -> Tuple[Customer, List[Order]]:
        return self.customer_repository.get_by_id(id)