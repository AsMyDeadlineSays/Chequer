import Vue from 'vue'

// import * as getters from './scan.getters'
import * as actions from './history.actions'
import * as mutations from './history.mutations'


const store = {
  namespaced: true,

  state: () => ({
    items: [],
    categories: []
  }),
  mutations,
  actions
}

export default store