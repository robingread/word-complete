import os
from flask import render_template, request, jsonify
from flask import Flask
from markupsafe import escape

from main import callback

app = Flask(__name__)
app.debug = True
app._static_folder = os.path.abspath("templates/static/")

@app.route('/', methods=['GET'])
def index():
    title = 'Create the input'
    return render_template('index.html', title=title)

@app.route("/complete", methods=['POST'])
def process_chatacters():
    payload = request.get_data(as_text=True)
    print(payload)
    response = {
        'result': 'success',
        'message': 'Task completed',
        'characters': payload,
    }
    print(callback(characters=payload))
    return jsonify(response)
