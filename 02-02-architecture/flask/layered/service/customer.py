from typing import Dict, Any, List, Optional, Tuple

from flask import json
from models.customer import CustomerRepository, Customer
from models.order import OrderRepository, Order

class CustomerService:
    def __init__(self):
        self.customer_repository = CustomerRepository()
        self.order_repository = OrderRepository()
    
    def get_customer_with_orders(self, id: int) -> Tuple[Customer, List[Order]]:
        customer = self.customer_repository.get_by_id(id)
        customer_orders = self.order_repository.get_by_customer_id(id)
        return [customer, customer_orders]