#! /bin/bash

set -eu

NAME=word-complete
IMG=robingread/word-complete:latest
PORT=5000

docker image pull $IMG
docker container stop $NAME --time 0 || true
docker run --name $NAME --detach --rm -p $PORT:$PORT $IMG || true

sleep 2

URL=http://localhost:$PORT
xdg-open $URL
