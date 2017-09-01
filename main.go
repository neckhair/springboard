package main

import (
	"fmt"
	"os"

	"github.com/neckhair/springboard/springboard"
)

var webserverPort string

func main() {
	err := springboard.InitializeDockerClient()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if len(os.Args) > 1 {
		webserverPort = os.Args[1]
	}
	springboard.StartWebserver(webserverPort)
}
