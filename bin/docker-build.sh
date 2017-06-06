#!/usr/bin/env bash
echo "start building docker image"
docker build -t tengpu .
echo "finish build"
