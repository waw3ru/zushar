 
<template>
<form class="ui form" novalidate>
    
    <div class="field" :class="{ 'required': properties.isMandatory }">
      <label v-if="properties.label">{{properties.label}}</label>

      <div class="ui fluid input">
        <input type="text" :id="picker_id" :placeholder="properties.placeholder">
      </div>

      <p class="content" v-if="properties.instructions">
        {{ properties.instructions }}
      </p>

    </div>

  </form>
</template>

<script>
import uuid from 'uuid'

export default {
  name: 'dateInput',
  data() {
        return {
            current: ''
        }
    },
  props: {
    properties: {
      type: Object,
      default: () => { return {} },
      required: true
    },
    picker_id: {
      type: String,
      default: uuid.v1() 
    }
  },
  mounted() {
    $(`#${this.picker_id}`)
      .datepicker({
        autoHide: true,
        format: "dd/mm/yyyy",
        zIndex: 100
      })
  },
  updated() {
    $(`#${this.picker_id}`)
      .datepicker({
        autoHide: true,
        date: (this.properties.date.default) ? new Date(this.properties.date.default) : new Date(),
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