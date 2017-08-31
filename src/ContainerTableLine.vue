<template>
  <tr>
    <td>
      <div class="ui green label" v-if="project">
        {{ project }}</br>
      </div>
      <span v-if="service">
        {{ service }}</br>
      </span>
      <span v-else>
        {{ sanitizedName }}
      </span>
    </td>
    <td>{{ container.Config.Image }}</td>
    <td>
      {{ container.State.Status }}
    </td>
    <td>
      <port-link v-for="port in mappedPorts" :port="port[0]" :key="port[0].HostPort" />
    </td>
  </tr>
</template>

<script>
import 'semantic-ui-table/table.css'
import 'semantic-ui-label/label.css'

import ContainerPortLink from './ContainerPortLink.vue'

export default {
  props: ['container'],
  components: {
    'port-link': ContainerPortLink
  },
  computed: {
    labels:        (component) => component.container.Config.Labels || {},
    project:       (component) => component.labels['com.docker.compose.project'],
    service:       (component) => component.labels['com.docker.compose.service'],
    sanitizedName: (component) => component.container.Name.replace(/^\//, ""),
    ports:         (component) => component.container.NetworkSettings.Ports,
    mappedPorts:   (component) => Object.values(component.ports || []).filter(value => {
      return value != null
    })
  }
}
</script>
