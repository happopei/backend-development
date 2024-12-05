from typing import Dict, Any, List, Tuple

from .model import CustomerRepository, Customer

class CustomerService:
    def __init__(self):
        self.customer_repository = CustomerRepository()
    
    def get_by_id(self, id: int) -> Customer:
        return self.customer_repository.get_by_id(id)