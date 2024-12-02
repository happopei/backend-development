
from typing import Dict, Optional
from flask import Blueprint, jsonify
from customer.service import CustomerService
from customer.model import Customer
from order.presentation import OrderAPI

api = Blueprint('api', __name__)

class CustomerAPI:
    def __init__(self):
        self.customer_service = CustomerService()
        self.order_api = OrderAPI()

    def register_routes(self, blueprint: Blueprint):
        blueprint.route('/customers/<int:id>')(self.get_customer_with_orders)
    
    def _sanitize(self, customer: Customer) -> Optional[Dict[str, str]]:
        if not customer:
            return None
        return {"id": customer.id, "name": customer.name}
    
    def get_customer_with_orders(self, id: int):
        customer = self.customer_service.get_by_id(id)
        
        if not customer:
            return jsonify({'error': 'Customer not found'}), 404
        
        response = self._sanitize(customer)

        customer_orders = self.order_api.get_orders_by_customer(id)
        response["orders"] = customer_orders

        return response
