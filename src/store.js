import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  containers: [],
  socket: null,
  currentProject: null
}

const mutations = {
  addContainer (state, container) {
    var index = state.containers.findIndex(c => c.Id == container.Id)
    if ( index < 0 ) {
      state.containers.push(container)
    }
  },
  updateContainer (state, container) {
    var index = state.containers.findIndex(c => c.Id == container.Id)
    if ( index >= 0 ) {
      state.containers.splice(index, 1, container)
    }
  },
  removeContainer (state, containerId) {
    var index = state.containers.findIndex(c => c.Id == containerId)
    if ( index >= 0 ) {
      state.containers.splice(index, 1)
    }
  },
  setCurrentProject (state, project) {
    state.currentProject = project
  }
}

const actions = {
  fetchAllContainers ({ dispatch, state }) {
    axios.get('/api/containers').then(response => {
      for( var container of response.data ) {
        dispatch('addContainerFromId', container.Id)
      }
    }).catch(error => console.error(error))
  },
  addContainerFromId (context, containerId) {
    axios.get(`/api/containers/${containerId}`).then(response => {
      var index = state.containers.findIndex(c => c.Id == containerId)
      if ( index < 0 ) {
        context.commit('addContainer', response.data)
      } else {
        context.commit('updateContainer', response.data)
      }
    }).catch(error => console.error(error))
  },
  updateContainer (context, containerId) {
    axios.get(`/api/containers/${containerId}`).then(response => {
      context.commit('updateContainer', response.data)
    }).catch(error => console.error(error))
  },

  // the following actions represent container events
  create  (context, containerId) { context.dispatch('addContainerFromId', containerId) },
  start   (context, containerId) { context.dispatch('addContainerFromId', containerId) },
  attach  (context, containerId) { context.dispatch('updateContainer', containerId) },
  kill    (context, containerId) { context.dispatch('updateContainer', containerId) },
  stop    (context, containerId) { context.dispatch('updateContainer', containerId) },
  die     (context, containerId) { context.dispatch('updateContainer', containerId) },
  destroy (context, containerId) { context.commit('removeContainer', containerId) },

  listenForEvents ({ dispatch, commit, state }) {
    if (state.socket != null) {
      return
    }

    state.socket = new WebSocket("ws://" + location.host + "/ws")

    state.socket.onmessage = msg => {
      var event = JSON.parse(msg.data)
      console.debug(`Got ${event.action} event for container ${event.actor.attributes.name}`)
      dispatch(event.action, event.actor.id)
    }
  }
}

// getters are functions
const getters = {
  containers: state => state.containers,
  currentProject: state => state.currentProject,
  projects: state => {
    return state.containers.map(container => {
      if ( container.Config.Labels ) {
        return container.Config.Labels['com.docker.compose.project']
      } else {
        return 'no project'
      }
    }).filter((value, index, self) => self.indexOf(value) === index).sort()
  },
  projectsWithCount: function(state, context) {
    return state.containers.reduce(function (prev, container) {
      var project = container.Config.Labels ? container.Config.Labels['com.docker.compose.project'] : 'No Project'
      if ( project in prev ) prev[project] ++;
      else prev[project] = 1;
      return prev;
    }, { null: state.containers.length })
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
