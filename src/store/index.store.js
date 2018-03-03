import Vue from 'vue'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import scan from './modules/scan/scan.store.js'


const store = {
  state: {},
  modules: {
    scan
  }
}

export default store