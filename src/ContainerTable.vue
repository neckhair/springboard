<template>
  <div id="container-table">
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Name or Service</th>
          <th>Image</th>
          <th>State</th>
          <th>Ports</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="containers.length == 0">
          <td colspan="3">Start a container to see it here.</td>
        </tr>
        <container-line v-for="container in containers" :container="container" :key="container.id" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContainerTableLine from './ContainerTableLine.vue'

export default {
  components: {
      'container-line': ContainerTableLine
  },
  computed: mapGetters(['containers']),
}
</script>

<style lang="sass">
  @import '~semantic-ui-sass/scss/collections/_table.scss';
</style>
