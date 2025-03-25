from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

account_blueprint = Blueprint('account', __name__)

accounts = [
    {"customer": "jane_smith", "account_id": "AA123", "balance": 1000},
    {"customer": "bob_smith", "account_id": "BB456", "balance": 2000}
]

@account_blueprint.route('', methods=['GET'])
@jwt_required()
def get_accounts():
    return jsonify(accounts)

@account_blueprint.route('', methods=['POST'])
@jwt_required()
def create_account():
    return jsonify({"message": "Account successfully created"}), 201