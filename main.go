package main

import (
	"net/http"

	"github.com/fsouza/go-dockerclient"
	"github.com/gin-gonic/gin"
)

var client *docker.Client
var err error

func main() {
	client, err = docker.NewClient("unix:///var/run/docker.sock")
	if err != nil {
		panic(err)
	}

	startWebserver()
}

func fetchContainers() []docker.APIContainers {
	options := docker.ListContainersOptions{All: false}
	containers, err := client.ListContainers(options)
	if err != nil {
		panic(err)
	}
	return containers
}

func startWebserver() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")

	router.Static("/assets", "./assets")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"containers": fetchContainers(),
		})
	})

	router.Run(":8080")
}
