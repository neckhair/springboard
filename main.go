package main

import (
	"net/http"

	"github.com/fsouza/go-dockerclient"
	"github.com/gin-gonic/gin"
)

var client *docker.Client
var containers []docker.APIContainers
var err error

func main() {
	client, err = docker.NewClient("unix:///var/run/docker.sock")
	if err != nil {
		panic(err)
	}

	fetchContainers()
	startWebserver()
}

func fetchContainers() {
	options := docker.ListContainersOptions{All: false}
	containers, err = client.ListContainers(options)
	if err != nil {
		panic(err)
	}
}

func startWebserver() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")

	router.Static("/assets", "./assets")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"containers": containers,
		})
	})

	router.Run(":8080")
}
