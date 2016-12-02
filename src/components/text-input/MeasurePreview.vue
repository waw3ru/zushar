
<template>
<div class="ui secondary segment">
  <h5 class="ui dividing header">Component Preview</h5>
  <form class="ui form" novalidate>
    
    <div class="field" :class="{ 'required': properties.isMandatory }">
      <label v-if="properties.label">{{properties.label}}</label>

      <div class="ui fluid input" 
        :class="{ 
          'right': properties.addon.suffix,
          'labeled': (properties.addon.prefix || properties.addon.suffix)
        }">
        
        <div class="ui black label" v-if="properties.addon.prefix">{{properties.addon.prefix}}</div>
        <input type="text" :placeholder="properties.placeholder">
        <div class="ui black tag label" v-if="properties.addon.suffix">
          {{properties.addon.suffix}}
        </div>

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
  name: 'measureInput',
  props: {
    properties: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style></style>