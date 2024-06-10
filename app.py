from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='client/dist', static_url_path='/')

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(path)

@app.route('/')
def index():
    return send_from_directory('client/dist', 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
