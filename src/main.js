
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import { sync } from 'vuex-router-sync'


const app = new Vue({
  router,
  store,
  ...App
});

app.$mount('#app');
