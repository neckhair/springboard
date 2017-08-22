package springboard

import "github.com/gin-gonic/gin"
import "net/http"

// StartWebserver starts a webserver which shows the running containers
func StartWebserver(port string) {
	if port == "" {
		port = "8080"
	}

	router := gin.Default()
	router.LoadHTMLGlob("templates/*")

	router.Static("/assets", "./assets")
	router.GET("/", serveContainers)

	router.Run(":" + port)
}

func serveContainers(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{
		"containers": FetchContainers(),
	})
}
