
<template>


    <form class="ui form" novalidate>
      <div class="field" :class="{ 'required': properties.isMandatory }">
        <label v-if="properties.label">{{properties.label}}</label>

        <div class="ui fluid input" 
          :class="{ 
            'right': properties.addon.suffix,
            'labeled': (properties.addon.prefix || properties.addon.suffix)
          }">
          
          <div class="ui label" v-if="properties.addon.prefix">{{properties.addon.prefix}}</div>

          <input type="text" 
            :placeholder="properties.placeholder" 
            :maxlength="properties.params.max" 
            :minlength="properties.params.min">

          <div class="ui label" v-if="properties.addon.suffix">
            {{properties.addon.suffix}}
          </div>
        </div>

        <p class="content" v-if="properties.instructions">
          {{ properties.instructions }}
        </p>

      </div>
    </form>

</template>

<script>

export default {
  name: 'normalInput',
  props: {
    properties: {
      type: Object,
      default: () => { return {} },
      required: true
    }
  }
}
</script>

<style>
  
</style>
