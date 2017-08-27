[![Build Status](https://travis-ci.org/neckhair/springboard.svg?branch=master)](https://travis-ci.org/neckhair/springboard)

# Springboard

Springboard is a tiny, little front-end for your local Docker instance. It just presents you an overview over the running containers with their exposed ports. Ports are clickable so you can immediately open a dockerized web application in your browser.

    docker run -t -d --rm -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock --name springboard neckhair/springboard

## Build

Assuming you have installed Go, NodeJS and Yarn you can just run the following commands:

    $ yarn install
    $ npm run webpack
    $ go run main.go
