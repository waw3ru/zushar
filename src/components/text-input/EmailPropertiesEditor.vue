<template>
  <div class="ui segment">
    <h5 class="ui grey dividing header">Component Properties Editor</h5>

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

      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden" 
          v-model.lazy="current.validate" :value="true">
          <label>Should the validity of email address be checked ?</label>
        </div>
      </div>

      <div class="ui divider"></div>

      <button class="ui large labeled icon button" tabindex="0" type="submit">
        <i class="save icon"></i> Save the Properties 
      </button>

    </form>

  </div>
</template>

<script>
import 'semantic/dist/components/checkbox.js'
import { textInput } from '../../vuex/questionTypes.js'

export default {
  name: 'emailPropertiesEditor',
  props: {
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      current: Object.assign({}, textInput.email)
    }
  },
  mounted() {
    $('.ui.checkbox').checkbox();
  },
  methods: {
    saveProps(data) {
      this.save({
        type: 'email',
        props: Object.assign({}, data)
      }, 
      function () {
        /*
        * after submitting properties return the props form to default
        * */
        this.current = Object.assign({}, textInput.email);
      }.bind(this));
    }
  }
}
</script>

<style></style>