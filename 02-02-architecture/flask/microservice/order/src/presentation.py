
from typing import Dict, List
from flask import Blueprint, jsonify
from .service import OrderService

api = Blueprint('api', __name__)

class OrderAPI:
    def __init__(self):
        self.order_service = OrderService()
    
    def register_routes(self, blueprint: Blueprint):
        blueprint.route('/orders/customer/<int:customer_id>')(self.get_orders_by_customer)

    def get_orders_by_customer(self, customer_id: int) -> List[Dict[str, int]]:
        customer_orders = self.order_service.get_orders_by_customer(customer_id)
        return jsonify([{"id": o.id} for o in customer_orders])
