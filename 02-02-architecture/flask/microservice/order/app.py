from flask import Flask
from src.presentation import OrderAPI, api

def create_app():
    app = Flask(__name__)
    
    # Setup dependencies
    order_api = OrderAPI()
    
    # Register routes
    order_api.register_routes(api)
    app.register_blueprint(api, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5001)