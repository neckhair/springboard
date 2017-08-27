import 'semantic-ui-site/site.css'
import 'semantic-ui-header/header.css'
import 'semantic-ui-container/container.css'

import './main.css'

import Vue from 'vue'
import ContainerTable from './ContainerTable.vue'
import store from './store.js'

new Vue({
  el: '#container-table',
  store,
  render: h => h(ContainerTable)
})
