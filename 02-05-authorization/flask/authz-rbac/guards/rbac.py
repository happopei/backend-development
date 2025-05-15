from flask import jsonify
from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

def roles_required(*allowed_roles):
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()  # Get the claims from the JWT
            user_role = claims.get('role', None)  # Get 'role' from claims
            if user_role not in allowed_roles:
                return jsonify({"msg": "Role " + user_role + " is not allowed to perform this action."}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper