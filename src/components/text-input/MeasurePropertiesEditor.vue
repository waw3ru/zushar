
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
        <label>Enter the maximum value to be accepted as input for question</label>
        <input type="text" v-model.number="current.params.max" 
          placeholder="Upper limit for the measure input">
      </div>

      <div class="eight wide field">
        <label>Enter the minimum value to be accepted as input for question</label>
        <input type="text" v-model.number="current.params.min" 
          placeholder="Lower limit for the measure input">
      </div>

    </div>

    <div class="fields">
      <div class="eight wide field">
        <label>Enter the number of decimal point to accept eg 2 dp</label>
        <input type="text" v-model.number="current.params.decimalPoints" 
          placeholder="The number of decimal points for the input of the question">
      </div>

      <div class="eight wide field">
        <label>Enter the character to use for separating decimal numbers eg. 3.1 or 3,1</label>
        <input type="text" v-model.lazy="current.params.decimalSeparationType" 
          placeholder="Character to use for decimal point representation eg . or ,">
      </div>

    </div>

    <div class="fields">
      <div class="eight wide field">
        <label>Enter a prefix for the question eg. Ksh.</label>
        <input type="text" v-model.lazy="current.addon.prefix" 
          placeholder="Measure Prefix">
      </div>

      <div class="eight wide field">
        <label>Enter a prefix for the question eg.  &deg;C</label>
        <input type="text" v-model.lazy="current.addon.suffix" 
          placeholder="Measure Suffix">
      </div>

    </div>

    <div class="field">
      <label>What type of measure is the question trying to capture eg. Weight, Price</label>
      <div class="ui fluid input">
        <input type="text" v-model.lazy="current.typeOfMeasure" 
        placeholder="Type of measure eg. Weight, Price, Height, Speed etc.">
      </div>
    </div>

    <div class="ui divider"></div>

    <button class="ui large labeled icon button" tabindex="0" type="submit">
      <i class="save icon"></i> Save the Properties 
    </button>

  </form>
</template>

<script>
import 'semantic/dist/components/checkbox.js'
import { textInput } from '../../vuex/questionTypes.js'

export default {
  name: 'measurePropertiesEditor',
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
      current: Object.assign({}, textInput.measure)
    }
  },
  methods: {
    saveProps(data) {
      this.save({
        type: 'measure',
        props: Object.assign({}, data)
      });
    }
  },
  mounted() {
    if (!_.isEmpty(this.properties)) {
      this.current = Object.assign({}, this.properties)
    }
    $('.ui.checkbox').checkbox();
  }
}
</script>

<style></style>
