import Vue from 'vue'

// import * as getters from './scan.getters'
import * as actions from './history.actions'
import * as mutations from './history.mutations'


const store = {
  namespaced: true,

  state: () => ({
    items: [{
      value: 'Some thig',
      spent: 9999
    }, {
      value: 'Good thing',
      spent: 750
    }]
  }),
  mutations,
  actions
}

export default store