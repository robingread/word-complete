# word_compelete

## Development

Initial development is best done locally using a `virtualenv`, and once results are satisfactory, you can also try using `docker` for testing before deployment.

To setup the `virtualenv` and install the dependencies, run:

```bash
source venv/bin/activate
pip install -r requirements.txt
```

To run the app itself, run:

```bash
cd src
flask --app app run
```

### Using Docker Container

To build a `docker` image for testing purposes (pre-deployment), run:

```bash
./scripts/build-dev.sh
```

To run the container, run:

```bash
docker -p 5000:5000 robingread/word-complete:dev
```

You can then try the program via web browser at [http://localhost:5000](http://localhost:5000). Alternativly you can also load the webpage by running:

```bash
xdg-open http://localhost:5000
```

## Deployment to Dockerhub

To build a multi-arch `docker` image (AMD64 & ARMv7/64) and push it to [Dockerhub](https://hub.docker.com/r/robingread/word-complete), run:

```bash
./scripts/build-deploy.sh
```

# Useful links:

These are links that were very helpful in making this project:

- https://www.jitsejan.com/python-and-javascript-in-flask
- https://openai.com/blog/chatgpt
