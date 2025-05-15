from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

account_blueprint = Blueprint('account', __name__)

accounts = [
    { 'id': 1, 'customer_id': 2, 'customer_name': 'jane_smith', 'account_id': 'AA123', 'account_type': "chequing", 'balance': 1000.00 },
    { 'id': 2, 'customer_id': 2, 'customer_name': 'jane_smith', 'account_id': 'BA456', 'account_type': "savings", 'balance': 5000.00 },
    { 'id': 3, 'customer_id': 4, 'customer_name': 'jane_doe', 'account_id': 'CD765', 'account_type': "savings", 'balance': 3000.00 },
    { 'id': 4, 'customer_id': 3, 'customer_name': 'bob_smith', 'account_id': 'YT432', 'account_type': "savings", 'balance': 2000.00 },
]

@account_blueprint.route('', methods=['GET'])
@jwt_required()
def get_accounts():
    claims = get_jwt()
    customer_id = claims.get('customer_id', None)  # Get customer_id from claims
    
    filtered_accounts = [a for a in accounts if a['customer_id'] == customer_id]

    return jsonify(filtered_accounts)