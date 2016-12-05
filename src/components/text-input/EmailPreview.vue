
<template>
  <form class="ui form" novalidate>
      
      <div class="field" :class="{ 'required': properties.isMandatory }">
        <label v-if="properties.label">{{properties.label}}</label>

        <div class="ui fluid input">
          <input type="text" :placeholder="properties.placeholder">
        </div>

        <p class="content" v-if="properties.instructions">
          {{ properties.instructions }}
        </p>

      </div>

    </form>
</template>

<script>
export default {
  name: 'emailInput',
  props: {
    properties: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style></style>