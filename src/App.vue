<template>
  <div id="app">

    <div class="top-bar">
      <title-bar></title-bar>
      <menu-bar></menu-bar>
    </div>

    <div class="body">
      <transition name="appLevel" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
import {
  hasDbInstance,
  clearQuestions,
  getQuestions,
  getForms
} from './vuex/database.js'
import titleBar from './components/TitleBar.vue'
import menuBar from './components/MenuBar.vue'

export default {
  name: 'app',
  components:{
    titleBar,
    menuBar
  },
  mounted() {
    let forms = getForms();
    let questions = getQuestions();

    if (hasDbInstance().questions && questions.length > 0) {
      this.$store.commit('LOAD_QUESTIONS', questions);
    }
    if (hasDbInstance().forms && forms.length > 0) {
      this.$store.dispatch('load_forms', forms);
    }
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
  margin: 0;
  position: fixed;
  z-index: 30;
  top: 0;
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
  animation: slideInRight .2s;
}
.appLevel-leave-active{
  animation: slideOutLeft .3s;
}
</style>
