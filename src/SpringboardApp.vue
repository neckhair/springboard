<template>
  <div class="ui container">
    <h1 class="ui inverted block header">Containers</h1>

    <div class="ui two column stackable grid container">
      <div  class="four wide column">
        <project-selector />
      </div>
      <div class="eleven wide column">
        <container-table />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectSelector from './ProjectSelector.vue'
import ContainerTable from './ContainerTable.vue'

export default {
  components: {
    'container-table': ContainerTable,
    'project-selector': ProjectSelector
  },
  created () {
    this.$store.dispatch('fetchAllContainers')
    this.$store.dispatch('listenForEvents')
  }
}
</script>

<style lang="sass">
  @import "~semantic-ui-sass/scss/globals/variables";
  @import "~semantic-ui-sass/scss/globals/site";
  @import "~semantic-ui-sass/scss/elements/header";
  @import "~semantic-ui-sass/scss/elements/container";
  @import "~semantic-ui-sass/scss/collections/grid";

  h1.ui.block.header {
    margin-top: 25px;
  }
</style>
