from flask import Flask
from flask_jwt_extended import JWTManager
from routes.auth import auth_blueprint
# from routes.account import account_blueprint

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Replace in prod!
jwt = JWTManager(app)

# Register blueprints (modules)
app.register_blueprint(auth_blueprint, url_prefix='/auth')
# app.register_blueprint(account_blueprint, url_prefix='/accounts')

if __name__ == '__main__':
    app.run(debug=True, host='localhost')
