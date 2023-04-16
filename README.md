# word_compelete

## Development

To setup the virtualenv and install the dependencies, run:

```bash
source venv/bin/activate
pip install -r requirements.txt
```

To run the app itself, run:

```bash
cd src
flask --app app run
```

## Deployment

This app can be deployed as a Docker container. To build the container, run:

```bash
docker build -t my-flask-app .
```

Run using:

```bash
docker run -p 5000:5000 my-flask-app
```

# Useful links:

These are links that were very helpful in making this project:

- https://www.jitsejan.com/python-and-javascript-in-flask
- https://openai.com/blog/chatgpt
