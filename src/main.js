import Vue from 'vue'
import store from './store.js'
import SpringboardApp from './SpringboardApp.vue'

new Vue({
  el: "#springboard-app",
  store,
  render: h => h(SpringboardApp)
})
