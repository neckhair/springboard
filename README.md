# Springboard

Springboard is a tiny, little front-end for your local Docker instance. It just presents you an overview over the running containers with their exposed ports. Ports are clickable so you can immediately open a dockerized web application in your browser.

## Build

Assuming you have installed Go, NodeJS and Webpack you can just run the following commands:

    $ yarn install
    $ webpack
    $ go run main.go

The build process is very basic. It will be moved into a Docker container itself later.
