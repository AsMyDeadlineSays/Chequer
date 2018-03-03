import Vue from 'vue'

// import * as getters from './scan.getters'
import * as actions from './toBuy.actions'
import * as mutations from './toBuy.mutations'


const store = {
  namespaced: true,

  state: () => ({
    items: []
  }),
  mutations,
  actions
}

export default store