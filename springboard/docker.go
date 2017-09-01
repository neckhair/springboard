package springboard

import (
	"log"
	"os"
	"fmt"

	"github.com/fsouza/go-dockerclient"
)

var dockerClient *docker.Client
const socketPath = "/var/run/docker.sock"

// InitializeDockerClient creates a docker client and returns an error if not successful
func InitializeDockerClient() error {
	var err error

	if _, err = os.Stat(socketPath); os.IsNotExist(err) {
		return fmt.Errorf("Cannot find Docker socket at %s", socketPath)
	}

	dockerClient, err = docker.NewClient("unix://" + socketPath)
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

func FetchContainer(id string) *docker.Container {
	if dockerClient == nil {
		panic("Docker client not initialized!")
	}

	container, err := dockerClient.InspectContainer(id)
	if err != nil {
		panic(err)
	}
	return container
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
