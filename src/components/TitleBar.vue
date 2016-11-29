
<template>
  <div id="title-bar">
    <div class="ui container">
      <div class="ui two column grid">
        <div class="column">
          <img class="ui fluid small image logo" src="./../assets/logos/zushar_1.png">
        </div>
        <div class="right floated three wide column">
          <button class="ui orange basic button leave-zushar">
            <i class="sign out icon"></i>
            leave zushar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'titleBar'
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
    margin-top: 5px;
  }
  #title-bar .leave-zushar{
    margin-top: 7px;
  }
</style>