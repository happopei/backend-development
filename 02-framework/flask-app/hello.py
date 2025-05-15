from flask import Flask

app = Flask(__name__)

@app.route("/hello")
def hello_world() -> str:
    return "<p>Hello, World!</p>"

@app.route("/hi")
def hi_world() -> str:
    return "<p>Hi, World!</p>"
