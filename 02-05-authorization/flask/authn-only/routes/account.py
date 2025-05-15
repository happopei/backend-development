from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

account_blueprint = Blueprint('account', __name__)

accounts = [
    { 'id': 1, 'customer': 'jane_doe', 'account_id': 'AA123', 'account_type': "chequing", 'balance': 1000.00 },
    { 'id': 2, 'customer': 'jane_doe', 'account_id': 'BA456', 'account_type': "savings", 'balance': 5000.00 },
    { 'id': 3, 'customer': 'jane_smith', 'account_id': 'BA344', 'account_type': "savings", 'balance': 5000.00 },
]

@account_blueprint.route('', methods=['GET'])
@jwt_required()
def get_accounts():
    print(accounts)
    return jsonify(accounts)

@account_blueprint.route('', methods=['POST'])
@jwt_required()
def create_account():
    return jsonify({"message": "Account successfully created"}), 201