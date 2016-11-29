
<template>
  <div id="menu-bar">
    <div class="ui attached menu">

      <div class="ui container">

        <div class="ui dropdown item dropdown-menu">
          <i class="folder open icon"></i> Create a Question
          <i class="dropdown icon"></i>
          <div class="menu">
            <router-link :to="{ name: 'textInputComponents' }" class="item">
              <i class="text width icon"></i> Text Input
            </router-link>
            <a class="item"><i class="options icon"></i> Selection</a>
            <a class="item"><i class="star half icon"></i> Scale and Rating</a>
          </div>
        </div>
        <a class="item">
          <i class="object group icon"></i> Workspace
        </a>
        <a class="item">
          <i class="cloud upload icon"></i> Save as draft
        </a>
        <router-link :to="{ name: 'helpSupport' }" class="item">
          <i class="help circle outline icon"></i> Help and Support
        </a>
  
      </div>

    </div>

  </div>
</template>

<script>
  import 'semantic/dist/components/visibility.js'
  import 'semantic/dist/components/transition.js'
  import 'semantic/dist/components/dropdown.js'

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