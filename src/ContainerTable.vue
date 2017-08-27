<template>
  <div id="container-table">
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Name or Service</th>
          <th>Image</th>
          <th>Public Ports</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="containers.length == 0">
          <td colspan="4">Start a container to see it here.</td>
        </tr>
        <tr v-for="container in containers">
          <td>
            <div class="ui green label" v-if="container.attributes['com.docker.compose.project']">
              {{ container.attributes['com.docker.compose.project']}}</br>
            </div>
            <span v-if="container.attributes['com.docker.compose.service']">
              {{ container.attributes['com.docker.compose.service'] }}</br>
            </span>
            <span v-else>
              {{ container.attributes.name }}
            </span>
          </td>
          <td> {{ container.attributes.image }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'semantic-ui-table/table.css'
import 'semantic-ui-label/label.css'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['containers']),
  methods: mapActions([]),
  created () {
    this.$store.dispatch('fetchAllContainers')
    this.$store.dispatch('listenForEvents')
  }
}
</script>
