<template>
  <tr v-show="currentProject == project || currentProject == null">
    <td>
      <span v-if="project">
        {{ project }}</br>
      </span>
      <strong v-if="service">
        {{ service }}</br>
      </strong>
      <span v-else>
        {{ sanitizedName }}
      </span>
    </td>
    <td>{{ container.Config.Image }}</td>
    <td>
      <div :class="statusClass">{{ container.State.Status }}</div>
    </td>
    <td>
      <port-link v-for="port in mappedPorts" :port="port[0]" :key="port[0].HostPort" />
    </td>
  </tr>
</template>

<script>
import ContainerPortLink from './ContainerPortLink.vue'
import { mapState } from 'vuex'

export default {
  props: ['container'],
  components: {
    'port-link': ContainerPortLink
  },
  computed: {
    ...mapState(['currentProject']),
    labels:        (component) => component.container.Config.Labels || {},
    project:       (component) => component.labels['com.docker.compose.project'],
    service:       (component) => component.labels['com.docker.compose.service'],
    sanitizedName: (component) => component.container.Name.replace(/^\//, ""),
    ports:         (component) => component.container.NetworkSettings.Ports,
    mappedPorts:   (component) => Object.values(component.ports || []).filter(value => {
      return value != null
    }),
    statusClass:   (component) => `ui basic horizontal state label ${component.container.State.Status}`
  }
}
</script>

<style lang="sass">
  @import '~semantic-ui-sass/scss/elements/_label.scss';

  .state {
    &.created, &.paused {
      @extend .yellow;
    }
    &.running {
      @extend .green;
    }
    &.stopped, &.deleted, &.exited {
      @extend .red;
    }
  }
</style>
