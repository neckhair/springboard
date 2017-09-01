import './main.scss'

import Vue from 'vue'
import ContainerTable from './ContainerTable.vue'
import store from './store.js'

new Vue({
  el: '#container-table',
  store,
  render: h => h(ContainerTable)
})
