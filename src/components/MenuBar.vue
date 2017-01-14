
<template>
  <div id="menu-bar">
    <div class="ui attached menu">

      <div class="ui container">

        <!-- view-drafts routes -->
          <router-link :to="{ name: 'Workspace' }" class="item" v-show="$route.name==='viewDrafts'">
            <i class="inbox icon"></i> Go To Workspace
          </router-link>
        <!-- end of routes -->

        <!-- workspace -->
          <router-link 
            :to="{ name: 'Workspace' }" 
            class="item" 
            v-show="($route.name!=='viewDrafts')">
            <i class="object group icon"></i> Working Area
          </router-link>
          <div 
            class="ui dropdown item dropdown-menu" 
            v-show="($route.name!=='viewDrafts') && ($store.state.workspace.status!=='preview')">
            <i class="folder open icon"></i> Create a Question
            <i class="dropdown icon"></i>
            <div class="menu">
              <router-link :to="{ name: 'textInputComponents' }" class="item">
                <i class="text width icon"></i> Text Input
              </router-link>
              <router-link :to="{ name: 'Selection' }" class="item">
                <i class="options icon"></i> Selection
              </router-link>
            </div>
          </div>
          <router-link 
            :to="{ name: 'saveDraft' }" 
            v-show="($route.name!=='viewDrafts') && ($store.state.workspace.status!=='preview')"
            class="item">
              <i class="cloud upload icon"></i> 
              {{ ($store.state.workspace.status === 'create') ? 'Save': 'Update' }} Form
          </router-link>
          <router-link 
            :to="{ name: 'viewDrafts' }" 
            class="item" 
            v-show="($route.name!=='viewDrafts')">
            <i class="sign out icon"></i> Leave Workspace
          </router-link>
        <!-- end of routes -->

      </div>

    </div>

  </div>
</template>

<script>
import 'semantic/dist/components/transition.js'
import 'semantic/dist/components/dropdown.js'

import { mapState } from 'vuex'

export default {
  name: 'menuBar',
  mounted() {
    $('.ui.dropdown-menu')
      .dropdown({
        on: 'click',
        transition: 'vertical flip'
      });
  }
}

</script>

<style>
  #menu-bar{
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  #menu-bar .attached.menu{
    border-top: 1px solid rgba(0,0,0,0.08);
  }
</style>