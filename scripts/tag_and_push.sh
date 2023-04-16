#! /bin/bash

SRC=robingread/word-complete:dev
DST=robingread/word-complete:latest

docker build -t $SRC .
docker tag $SRC $DST
docker push $DST