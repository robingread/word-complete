#! /bin/bash

set -eu

BUILDER_NAME=multi-stach
IMG=robingread/word-complete
TAG=latest

export DOCKER_CLI_EXPERIMENTAL=enabled

docker buildx create --name $BUILDER_NAME --use || true
docker buildx inspect --bootstrap
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t $IMG:$TAG --push .
