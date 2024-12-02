from flask import Flask
from customer.presentation import CustomerAPI, api

def create_app():
    app = Flask(__name__)
    
    # Setup dependencies
    customer_api = CustomerAPI()
    
    # Register routes
    customer_api.register_routes(api)
    app.register_blueprint(api, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5001)