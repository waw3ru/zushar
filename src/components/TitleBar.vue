
<template>
  <div id="title-bar">
    <div class="ui fluid container">
      <div class="ui two column grid">
        <div class="column">
          <img class="ui fluid small image logo" src="./../assets/logos/zushar_1.png">
        </div>
        <div class="right floated two wide column">
          <!--<router-link :to="{ name: 'helpSupport' }" tag="button" class="ui tiny primary basic button btn">
            <i class="help circle outline icon"></i> Help and Support
          </router-link>-->
          <!--
          <button class="ui tiny basic button btn">
            <i class="sign out icon"></i> Exit
          </button>-->
          <h4 id="version_id" class="ui header">version v{{ version }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'titleBar',
    data() {
      return {
        version: process.env.version
      }
    }
  }
</script>

<style>
  #title-bar{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 65px;
    background: #FFF;
  }
  #title-bar .logo{
    margin-top: 10px;
    margin-left: 100px;
  }
  #title-bar .btn{
    margin-top: 7px;
    margin-left: 10px;
  }
  #version_id{
    color: rgba(239,108,0,0.2);
    margin-top: 16px;
  }
</style>