#! /bin/bash

set -eu

IMG=robingread/word-complete
TAG=dev

docker build -t $IMG:$TAG .