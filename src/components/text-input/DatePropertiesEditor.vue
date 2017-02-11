
<template>
  <form class="ui form" novalidate @submit.prevent="saveProps(current)">

      <div class="field">
        <label>Enter the question</label>
        <div class="ui fluid input">
          <input type="text" v-model.lazy="current.label" 
          placeholder="Enter label">
        </div>
      </div>

      <div class="field">
        <label>Enter the question's instruction if any exist</label>
        <div class="ui fluid input">
          <input type="text" v-model.lazy="current.instructions" 
          placeholder="Enter instruction">
        </div>
      </div>

      <div class="field">
        <label>Enter any placeholder for the question input</label>
        <div class="ui fluid input">
          <input type="text" v-model.lazy="current.placeholder" 
          placeholder="Enter placeholder">
        </div>
      </div>

      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden" 
          v-model.lazy="current.isMandatory" :value="true">
          <label>Should the question be mandatory to answer ?</label>
        </div>
      </div>

      <div class="fields">
        <div class="eight wide field">
          <label>Select beginning date for the calendar</label>
          <input type="text" v-model="current.params.max" id="max-date"
            placeholder="Maximum limit for characters">
        </div>

        <div class="eight wide field">
          <label>Select the end date for the calendar</label>
          <input type="text" v-model="current.params.min" id="min-date"
            placeholder="Minimum limit for characters">
        </div>

      </div>

      <div class="field">
        <label>Please select date selection mode</label>
        <select class="ui dropdown" id="date-mode-dropdown" 
          v-model.number="current.date.startView">
          <option value="">How should the date(s) be selected</option>
          <option value="0">Display whole calendar</option>
          <option value="1">Display list months first</option>
          <option value="2">Display list of years first</option>
        </select>
      </div>

      <div class="field">
        <label>Is there a default date for this question</label>
        <input type="text" v-model="current.date.default" id="default-date"
          placeholder="A default date eg. 2015-12-16">
      </div>
      
      <div class="field">
        <label>Select the format which the date will be saved</label>
        <select class="ui dropdown" id="format-select" v-model="current.date.format">
          <option value="">Date format when collecting daa for this question</option>
          <option value="YYYY - MM - DD">Year - Month - Date</option>
          <option value="YYYY/MM/DD">Year/Month/Date</option>
          <option value="YYYY.MM.DD">Year.Month.Date</option>
          <option value="DDDo MMM YYYY">Date(27th) Month(Jan) Year</option>
          <option value="ddd DDDo MMMM YYYY">Date(31st) Month(January) Year</option>
          <option value="dddd DDDo MMMM YYYY">Day(Sunday) Date(21st) Month(January) Year</option>
        </select>
      </div>
      

      <div class="ui divider"></div>

      <button class="ui large labeled icon button" tabindex="0" type="submit">
        <i class="save icon"></i> Save the Properties 
      </button>

    </form>
</template>

<script>
import { textInput } from '../../vuex/questionTypes.js'
import 'semantic/dist/components/transition.js'
import 'semantic/dist/components/dropdown.js'
import 'semantic/dist/components/checkbox.js'
import moment from 'moment'
import 'datepicker/dist/datepicker.js'

export default {
  name: 'datePropertiesEditor',
  props: {
    save: {
      type: Function,
      required: true
    },
    properties: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      current: Object.assign({}, textInput.date)
    }
  },
  methods: {
    saveProps(data) {
      this.save({
        type: 'date',
        props: Object.assign({}, data)
      });
    }
  },
  mounted() {
    if (!_.isEmpty(this.properties)) {
      this.current = Object.assign({}, this.properties)
    }

    $('.ui.checkbox').checkbox();

    // activate select input dropdown
    $('#date-mode-dropdown')
      .dropdown({
        on: 'click',
        transition: 'vertical flip'
      })
    $('#format-select')
      .dropdown({
        on: 'click',
        transition: 'fade'
      })

      $('#max-date')
        .datepicker({
          autoHide: true,
          format: "yyyy-mm-dd",
          zIndex: 100
        })
        .on('pick.datepicker', function (e) {
          this.current.params.max = moment(e.date).format("MM/DD/YYYY");
        }.bind(this))
      $('#min-date')
        .datepicker({
          autoHide: true,
          format: "yyyy-mm-dd",
          zIndex: 100
        })
        .on('pick.datepicker', function (e) {
          this.current.params.min = moment(e.date).format("MM/DD/YYYY");
        }.bind(this))
      $('#default-date')
        .datepicker({
          autoHide: true,
          format: "yyyy-mm-dd",
          zIndex: 100
        })
        .on('pick.datepicker', function (e) {
          this.current.date.default = moment(e.date).format("MM/DD/YYYY");
        }.bind(this))

  }
}
</script> 

<style></style>
