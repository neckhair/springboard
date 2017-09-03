<template>
  <div id='#project-selector'>
    <div class="ui vertical menu">
      <a @click="setCurrentProject(null)" :class="itemClasses(null)">
        All Projects
        <div class="ui label">{{ projectsWithCount[null] }}</div>
      </a>
      <a v-for="project in projects" @click="setCurrentProject(project)" :class="itemClasses(project)">
        {{project}}
        <div class="ui label">{{ projectsWithCount[project] }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(['projects', 'projectsWithCount']),
    ...mapState(['currentProject'])
  },
  methods: {
    ...mapMutations(['setCurrentProject']),
    itemClasses: function(project) {
      var cssClasses = { "item": true, "teal": true }
      cssClasses["active"] = project == this.currentProject
      return cssClasses
    }
  }
}
</script>

<style lang="sass">
  @import '~semantic-ui-sass/scss/globals/variables';
  @import '~semantic-ui-sass/scss/collections/menu';
</style>
