
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import HelpSupport from './pages/HelpSupport.vue'
import Workspace from './pages/Workspace.vue'
import TextInput from './pages/TextInput.vue'
import EditProperties from './pages/EditProperties.vue'
import SaveDraft from './pages/SaveDraft.vue'
import ViewDrafts from './pages/ViewDrafts.vue'
import Selection from './pages/Selection.vue'
import ChoicesEditor from './pages/ChoicesEditor.vue'

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
    { path: '/drafts', component: ViewDrafts, name: 'viewDrafts' },
    { path: '/selection', component: Selection, name: 'Selection' },
    { path: '/choices', component: ChoicesEditor, name: 'choicesEditor' },
    { path: '/', redirect: '/drafts' }
  ]
})
