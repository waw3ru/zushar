<template>
  <div id="app">

    <div class="top-bar">
      <title-bar></title-bar>
      <menu-bar></menu-bar>
    </div>

    <div class="body">
      <transition name="appLevel">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>

  </div>
</template>

<script>
import titleBar from './components/TitleBar.vue'
import menuBar from './components/MenuBar.vue'

export default {
  name: 'app',
  components:{
    titleBar,
    menuBar
  }
}
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  background: #FAFAFA;
}
#app .top-bar{
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  top: 0;
  position: fixed;
  z-index: 30;
}
#app .body{
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  top: 0;
  margin-top: 120px;
  padding-bottom: 30px;
}

/* top-level router transitions */
.appLevel-enter-active{
  animation: slideInUp .6s;
}
.appLevel-leave-active{
  animation: fadeOut .4s;
}
</style>
