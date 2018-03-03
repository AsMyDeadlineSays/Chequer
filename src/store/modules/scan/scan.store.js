import Vue from 'vue'

// import * as getters from './scan.getters'
import * as actions from './scan.actions'
import * as mutations from './scan.mutations'


const store = {
  namespaced: true,

  state: () => ({
    receipt: [],
    parsed: false,
    hydrated: false,
  }),
  mutations,
  actions
}

export default store