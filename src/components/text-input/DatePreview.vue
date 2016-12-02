 
<template>
<div class="ui secondary segment">
  <h5 class="ui dividing header">Component Preview</h5>

  <form class="ui form" novalidate>
    
    <div class="field" :class="{ 'required': properties.isMandatory }">
      <label v-if="properties.label">{{properties.label}}</label>

      <div class="ui fluid input">
        <input type="text" id="date-que-input" :placeholder="properties.placeholder">
      </div>

      <p class="content" v-if="properties.instructions">
        {{ properties.instructions }}
      </p>

    </div>

  </form>

</div>
</template>

<script>
import 'datepicker/dist/datepicker.js'

export default {
  name: 'dateInput',
  props: {
    properties: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    $('#date-que-input')
      .datepicker({
        autoHide: true,
        format: "yyyy-mm-dd",
        zIndex: 100
      })
  },
  updated() {
    $("#date-que-input").datepicker({
      autoHide: true,
      date: new Date(this.properties.date.default),
      startDate: new Date(this.properties.params.max),
      endDate: new Date(this.properties.params.min),
      format: "dd/mm/yyyy",
      startView: this.properties.date.startView,
      zIndex: 100
    })
  }
}
</script>

<style></style>