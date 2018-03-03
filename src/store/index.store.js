import Vue from 'vue'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import scan from './modules/scan/scan.store.js'
import toBuy from './modules/toBuy/toBuy.store.js'


const store = {
  state: {
    family: 'new'
  },
  actions,
  getters,
  mutations,
  modules: {
    scan,
    toBuy
  }
}

export default store