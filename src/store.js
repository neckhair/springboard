import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  containers: [],
  socket: null
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  addContainer (state, container) {
    state.containers.push(container)
  },
  removeContainer (state, container) {
    var index = state.containers.findIndex(c => c.id == container.id)
    if (index >= 0) {
      state.containers.splice(index, 1)
    }
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  fetchAllContainers ({ commit, state }) {
    // for container in containers
    // commit('addContainer')
    console.log('Fetching all containers...')
  },
  listenForEvents ({ commit, state }) {
    if (state.socket != null) {
      return
    }

    state.socket = new WebSocket("ws://" + location.host + "/ws")

    state.socket.onmessage = msg => {
      var event = JSON.parse(msg.data)
      switch(event.action) {
        case "create":
          commit('addContainer', event.actor)
          break
        case "destroy":
          commit('removeContainer', event.actor)
          break
      }
    }
  }
}

// getters are functions
const getters = {
  containers: state => state.containers
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
