from flask import jsonify
from datetime import datetime
from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

# Function to check if the user is accessing within business hours
def check_business_hours():
    current_hour = datetime.now().hour
    if current_hour < 9 or current_hour > 17:
        return False
    return True

# Function to check if the user has the required role
def check_user_role(required_role):
    claims = get_jwt()  # Get the claims from the JWT
    user_role = claims.get('role', None)  # Get 'role' from claims
    if user_role != required_role:
        return False
    return True
    
# ABAC decorator with selective checks
def abac_required(checks=None, allowed_role=None):
    if checks is None:
        checks = []  # Default to no checks

    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def decorated_view(*args, **kwargs):
            # Selectively check based on the requested checks
            if 'time' in checks and not check_business_hours():
                return jsonify({"msg": "Access denied outside business hours"}), 403

            required_role = allowed_role 
            if 'role' in checks and not check_user_role(required_role):
                return jsonify({"msg": f"Access denied."}), 403
            
            # If all checks pass, call the original function
            return fn(*args, **kwargs)

        return decorated_view

    return decorator