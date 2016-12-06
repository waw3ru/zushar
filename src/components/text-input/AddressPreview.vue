
<template>

  <form class="ui form" novalidate>
    <h4 class="ui dividing header" v-if="properties.label">{{ properties.label }}</h4>

    <div class="required field">
      <label>Enter your address line</label>
      <div class="ui fluid input">
        <input type="text" placeholder="address line eg. P.O Box 3450">
      </div>
    </div>

    <div class="fields">
      <div class="eight wide required field">
        <label>Enter your city / town name</label>
        <div class="ui fluid input">
          <input type="text" placeholder="eg. Nairobi, Kigali, London">
        </div>
      </div>
      <div class="eight wide required field">
        <label>Enter your state/province</label>
        <div class="ui fluid input">
          <input type="text" placeholder="eg. Nairobi, Kansas, Johannesburg">
        </div>
      </div>
    </div>
    <div class="fields">
      <div class="eight wide required field">
        <label>Enter your country</label>
        <select class="ui dropdown" :id="picker_id">
          <option v-for="country in countries" :value="country.toLowerCase()">{{country}}</option>
        </select>
      </div>
      <div class="eight wide required field">
        <label>Enter your postal code / zip code</label>
        <div class="ui fluid input">
          <input type="text" placeholder="Postal code / Zip code">
        </div>
      </div>
    </div>
    

    <p class="content" v-if="properties.instructions">
      {{ properties.instructions }}
    </p>
  
  </form>
  
</template>

<script>
import countries from '../../vuex/countries'
import uuid from 'uuid'

import 'semantic/dist/components/transition.js'
import 'semantic/dist/components/dropdown.js'

export default {
  name: 'addressInput',
  props: {
    properties: {
      type: Object,
      default: () => { return {} }
    },
    picker_id: {
      type: String,
      default: uuid.v1()
    }
  },
  data() {
    return {
      countries: countries.concat([])
    }
  },
  mounted() {
    $(`#${this.picker_id}`).dropdown({
      on: 'click',
      transition: 'horizontal flip'
    })  
  }
}
</script>

<style></style>