
<template>

  <div class="ui secondary segment">
    <h5 class="ui dividing header">Component Preview</h5>
    <form class="ui form" novalidate>
      <div class="field" :class="{ 'required': properties.isMandatory }">
        <label v-if="properties.label">{{properties.label}}</label>

        <div class="ui fluid input">

          <textarea type="text"
            :maxlength="properties.params.max" 
            :minlength="properties.params.min">
          </textarea>

        </div>

        <p class="content" v-if="properties.instructions">
          {{ properties.instructions }}
        </p>

      </div>
    </form>
  </div>

</template>

<script>

export default {
  name: 'paragraphInput',
  props: {
    properties: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style>
  
</style>