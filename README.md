# word-compelete

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

## Setting up on a Raspberry Pi

The intended target deployment for this remains a [Raspberry Pi](https://www.raspberrypi.org/) and this section outlines how to setup a Raspberry Pi so that the `docker` container is started at boot and the web-brower is opened in full-screen mode.

Create a `startup.sh` in the home directory and add the following: 

```bash
#!/bin/sh

ZOOM_SCALE_FACTOR=1.0

docker run --rm --name word-complete -d -p 5000:5000 robingread/word-complete

sleep 45

DISPLAY=:0 /usr/bin/chromium-browser \
    --kiosk \
    --force-device-scale-factor=$ZOOM_SCALE_FACTOR \
    http://localhost:5000 &
```

Now make the script executable:

```bash
chmod +x $HOME/startup.sh
```

Now add the following to `crontab` (`sudo crontab -e`):

```bash
@reboot /home/pi/startup.sh &
```

# Useful links:

These are links that were very helpful in making this project:

- https://www.jitsejan.com/python-and-javascript-in-flask
- https://openai.com/blog/chatgpt
- https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/
