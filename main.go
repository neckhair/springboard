package main

import (
	"net/http"

	"github.com/fsouza/go-dockerclient"
	"github.com/gin-gonic/gin"
)

func main() {
	endpoint := "unix:///var/run/docker.sock"
	client, err := docker.NewClient(endpoint)
	if err != nil {
		panic(err)
	}

	options := docker.ListContainersOptions{All: false}
	containers, err := client.ListContainers(options)
	if err != nil {
		panic(err)
	}

	router := gin.Default()
	router.LoadHTMLGlob("templates/*")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"containers": containers,
		})
	})

	router.Run(":8080")
}
