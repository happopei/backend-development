from typing import List, Optional
import urllib.request

from flask import json

# Notice duplication of Order class here
class Order:
    id: int
    product_id: str

class Customer:
    id: int
    name: str
    address: str
    orders: List[Order]

    def __init__(self, id, name, address, orders = []):
        self.id = id
        self.name = name
        self.address = address
        self.orders = orders

    def set_orders(self, orders):
        self.orders = orders

class CustomerRepository:
    def __init__(self):
        self._customers = [
            Customer(1, "John Doe", "Toronto")
        ]
    
    def get_by_id(self, id: int) -> Optional[Customer]:
        # Fetch customer data from local customer database
        customer = next((c for c in self._customers if c.id == id), None)

        # Notice the URL and HTTP request here?
        response = urllib.request.urlopen(f"http://127.0.0.1:5001/api/orders/customer/{id}").read()
        orders = json.loads(response.decode('utf-8'))

        # We need to deserialize JSON to an object to be type-safe
        customer.set_orders(orders)
        
        return customer