import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from '@/src/App.vue'
import storeTemplate from '@/src/store/index.store'
import routes from '@/src/router/index.routes'

import './sw.js'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store(storeTemplate)
const router = new VueRouter({
  mode: 'history',
  routes
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
