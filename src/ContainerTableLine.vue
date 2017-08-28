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
        {{ container.attributes.name }}
      </span>
    </td>
    <td>{{ container.attributes.image }}</td>
    <td>
      {{ container.status }}
    </td>
  </tr>
</template>

<script>
import 'semantic-ui-table/table.css'
import 'semantic-ui-label/label.css'

export default {
  props: ['container'],
  computed: {
    project: function () { this.container.attributes['com.docker.compose.project'] },
    service: function () { this.container.attributes['com.docker.compose.service'] }
  }
}
</script>
