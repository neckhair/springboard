package springboard

import "github.com/fsouza/go-dockerclient"

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
