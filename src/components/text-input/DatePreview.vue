
<template>
<div class="ui secondary segment">
  <h5 class="ui dividing header">Component Preview</h5>

  <form class="ui form" novalidate>
    
    <div class="field" :class="{ 'required': properties.isMandatory }">
      <label v-if="properties.label">{{properties.label}}</label>

      <div class="ui fluid input">
        <input type="text" id="date-pickr" :placeholder="properties.placeholder">
      </div>

      <p class="content" v-if="properties.instructions">
        {{ properties.instructions }}
      </p>

    </div>

  </form>

</div>
</template>

<script>
import Flatpickr from 'flatpickr/dist/flatpickr.js'

export default {
  name: 'dateInput',
  props: {
    properties: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    $("#date-pickr").flatpickr({
      defaultDate: this.properties.date.default,
      maxDate: this.properties.params.max,
      minDate: this.properties.params.min,
      mode: this.properties.date.mode,
      utc: this.properties.date.utc,
      weekNumbers: this.properties.date.showWeekNum
    }); 
  }
}
</script>

<style></style>