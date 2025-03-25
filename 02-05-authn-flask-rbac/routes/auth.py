from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

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
    if username != user["username"] or password != user["password"]:
        return jsonify({"msg": "Invalid credentials"}), 401
        
    access_token = create_access_token(identity={"username": user['username']})
    return jsonify(access_token=access_token)
