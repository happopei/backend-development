from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

account_blueprint = Blueprint('account', __name__)

accounts = [
    {"customer": "jane_smith", "account_id": "AA123", "balance": 1000},
    {"customer": "bob_smith", "account_id": "BB456", "balance": 2000}
]

@account_blueprint.route('/<account_id>', methods=['GET'])
@jwt_required()
def get_account(account_id):
    current_user = get_jwt_identity()
    account = next((a for a in accounts if a['account_id'] == account_id), None)
    if account == None or account['customer'] != current_user:
        return jsonify({"msg": "You cannot perform this action."}), 403
    return jsonify(account)