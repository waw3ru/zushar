
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import HelpSupport from './views/HelpSupport.vue'
import Workspace from './views/Workspace.vue'
import TextInput from './views/TextInput.vue'
import Workscape from './views/Workspace.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Workspace, name: 'workspace' },
    { path: '/help-n-support', component: HelpSupport, name: 'helpSupport' },
    { path: '/text-input', component: TextInput, name: 'textInputComponents' },
    { path: '/workspace', component: Workspace, name: 'Workspace' }
  ]
})