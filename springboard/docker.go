package springboard

import (
	"log"

	"github.com/fsouza/go-dockerclient"
)

var dockerClient *docker.Client

// InitializeDockerClient creates a docker client and returns an error if not successful
func InitializeDockerClient() error {
	var err error

	dockerClient, err = docker.NewClient("unix:///var/run/docker.sock")
	return err
}

// FetchContainers gets running containers from Docker
func FetchContainers() []docker.APIContainers {
	if dockerClient == nil {
		panic("Docker client not initialized!")
	}

	options := docker.ListContainersOptions{All: false}
	containers, err := dockerClient.ListContainers(options)
	if err != nil {
		panic(err)
	}
	return containers
}

type APIEvents = docker.APIEvents
type ContainerEventCallbackFunction func(*APIEvents)

// ListenForContainerEvents subscribes to events on the docker deamon
func ListenForContainerEvents(callback ContainerEventCallbackFunction) {
	listener := make(chan *APIEvents)
	err := dockerClient.AddEventListener(listener)
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		err = dockerClient.RemoveEventListener(listener)
		if err != nil {
			log.Fatal(err)
		}
	}()

	for {
		apiEvent := <-listener
		if apiEvent.Type == "container" {
			callback(apiEvent)
		}
	}
}
