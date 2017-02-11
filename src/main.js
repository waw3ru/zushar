
import 'babel-polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import { sync } from 'vuex-router-sync'

sync(store, router);

new Vue({
  el: '#zushar',
  render: h => h(App),
	store,
  router
})
