from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

auth_blueprint = Blueprint('auth', __name__)

users = [
    {"username": "alice_teller", "password": "teller123", "role": "teller"},
    {"username": "jane_smith", "password": "password", "role": "customer"}
]

@auth_blueprint.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    print(f"Current User: {username}") 
    user = next((u for u in users if u['username'] == username), None)
    if username == user["username"] and password == user["password"]:
        access_token = create_access_token(identity=user['username'])
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid credentials"}), 401
