import os
from flask import render_template
from flask import Flask
from markupsafe import escape


app = Flask(__name__)
app.debug = True
app._static_folder = os.path.abspath("templates/static/")

@app.route('/', methods=['GET'])
def index():
    title = 'Create the input'
    return render_template('index.html', title=title)

@app.route("/<characters>")
def process_chatacters(characters):
    return f"<p>Hello, world! You entered: {escape(characters)}</p>"
