from flask import jsonify
from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
import datetime

def roles_required(*allowed_roles):
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()  # Get the claims from the JWT
            user_role = claims.get('role', None)  # Get 'role' from claims
            if user_role not in allowed_roles:
                return jsonify({"msg": "Role " + user_role + " is not allowed to perform this action."}), 403

            if user_role == "teller" and not is_weekday():
                return jsonify({"msg": "Access denied: Not allowed to access during outside weekday."}), 403

            return fn(*args, **kwargs)
        return decorator
    return wrapper

def is_weekday() -> bool:
    today = datetime.datetime.now()
    day_of_week = today.weekday()  # 0 is Monday, 1 is Tuesday, ..., 6 is Sunday
    
    # Check if day is between Monday (0) and Friday (4) inclusive
    return 0 <= day_of_week <= 4