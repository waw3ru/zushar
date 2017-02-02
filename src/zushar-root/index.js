/*
* created by waweru
* @desc:
*   handle user (authentication / registration) and site information
* */

'use strict';

import 'babel-polyfill' // polyfilll for es6 JS
import '../../theme/index.css' // element-ui theme
import 'flexboxgrid/dist/flexboxgrid.css' // grid system
import 'font-awesome/css/font-awesome.css' // icons
import 'animate.css/animate.css' // css3 animation keyframes

import Vue from 'vue'
import Root from './Root.vue'
// import { sync } from 'vuex-router-sync'
// import router from './router'
// import store from './store'
import ElementUI from 'element-ui'

// sync(store, router);
Vue.use(ElementUI);

/*
* @docs:
*   mounting the app to index.html
* */
new Vue({
  el: '#mount',
  render: h => h(Root)
});