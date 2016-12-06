
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import HelpSupport from './views/HelpSupport.vue'
import Workspace from './views/Workspace.vue'
import TextInput from './views/TextInput.vue'
import EditProperties from './views/EditProperties.vue'
import SaveDraft from './views/SaveDraft.vue'
import ViewDrafts from './views/ViewDrafts.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'active',
  routes: [
    { path: '/help-n-support', component: HelpSupport, name: 'helpSupport' },
    { path: '/text-input', component: TextInput, name: 'textInputComponents' },
    { path: '/workspace', component: Workspace, name: 'Workspace' },
    { path: '/editor', component: EditProperties, name: 'editProperties' },
    { path: '/save-draft', component: SaveDraft, name: 'saveDraft' },
    { path: '/drafts', component: ViewDrafts, name: 'viewDrafs' },
    { path: '/', redirect: '/workspace' }
  ]
})