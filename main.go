package main

import (
	"os"

	"github.com/neckhair/springboard/springboard"
)

var webserverPort string

func main() {
	err := springboard.InitializeDockerClient()
	if err != nil {
		panic(err)
	}

	if len(os.Args) > 1 {
		webserverPort = os.Args[1]
	}
	springboard.StartWebserver(webserverPort)
}
