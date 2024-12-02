from typing import Optional


class Customer:
    id: int
    name: str
    address: str

    def __init__(self, id, name, address):
        self.id = id
        self.name = name
        self.address = address

class CustomerRepository:
    def __init__(self):
        self._customers = [
            Customer(1, "John Doe", "Toronto")
        ]
    
    def get_by_id(self, id: int) -> Optional[Customer]:
        return next((c for c in self._customers if c.id == id), None)