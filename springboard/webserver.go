package springboard

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
)

var m *melody.Melody

// StartWebserver starts a webserver which shows the running containers
func StartWebserver(port string) {
	if port == "" {
		port = "8080"
	}

	router := gin.Default()
	router.LoadHTMLGlob("templates/*")

	m = melody.New()
	defer func() { m.Close() }()

	router.Static("/assets", "./assets")
	router.GET("/", serveRoot)
	router.GET("/api/containers", serveContainers)
	router.GET("/api/containers/:id", serveContainer)
	router.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})

	go ListenForContainerEvents(broadcastContainerEvent)
	router.Run(":" + port)
}

func serveRoot(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{})
}

func serveContainers(c *gin.Context) {
	c.JSON(http.StatusOK, FetchContainers())
}

func serveContainer(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, FetchContainer(id))
}

func broadcastContainerEvent(apiEvent *APIEvents) {
	if m == nil {
		return
	}

	jsonEvent, err := json.Marshal(apiEvent)
	if err != nil {
		fmt.Println(err)
		return
	}
	m.Broadcast(jsonEvent)
}
