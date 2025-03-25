from flask import Blueprint, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from utils.guards import role_required

account_blueprint = Blueprint('account', __name__)

accounts = [
    {"customer": "jane_smith", "account_id": "AA123", "balance": 1000},
    {"customer": "bob_smith", "account_id": "BB456", "balance": 2000}
]

@account_blueprint.route('', methods=['GET'])
# @jwt_required()
# @role_required('customer')  # Only customers can view their accounts
def view_account():
    # current_user = get_jwt_identity()
    print("Decoded JWT identity:", current_user)  # For debugging
    user_accounts = [a for a in accounts if a['customer'] == current_user['username']]
    return jsonify(user_accounts)
