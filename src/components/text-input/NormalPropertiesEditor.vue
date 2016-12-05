
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
    
      <div class="fields">
        <div class="eight wide field">
          <label>Enter prefix for the question eg. Ksh.</label>
          <input type="text" v-model.lazy="current.addon.prefix" 
            placeholder="Enter prefix like $ or Ksh.">
        </div>

        <div class="eight wide field">
          <label>Enter suffix for the question eg .00</label>
          <input type="text" v-model.lazy="current.addon.suffix" 
            placeholder="Enter suffix like % or .00">
        </div>

      </div>

      <div class="fields">
        <div class="eight wide field">
          <label>Enter the maximum number of characters to accept for the question</label>
          <input type="text" v-model.number="current.params.max" 
            placeholder="Maximum limit for characters">
        </div>

        <div class="eight wide field">
          <label>Enter the minimum number of characters to accept for the question</label>
          <input type="text" v-model.number="current.params.min" 
            placeholder="Minimum limit for characters">
        </div>

      </div>

      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden" 
          v-model.lazy="current.isMandatory" :value="true">
          <label>Should the question be mandatory to answer ?</label>
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
  name: 'normalPropertiesEditor',
  props: {
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      current: Object.assign({}, textInput.normal)
    }
  },
  mounted() {
    $('.ui.checkbox').checkbox();
  },
  methods: {
    saveProps(data) {
      this.save({
        type: 'normal',
        props: Object.assign({}, data)
      });
    }
  }
}
</script>

<style></style>