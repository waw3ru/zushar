
<template>
  <div class="ui container" id="text-input-components">
    <div class="ui two column grid">

      <!-- menu for text input components -->
      <div class="centered three wide column">
        <div class="ui vertical menu">
          <div class="header item">Text Input Components</div>
          <a class="item" :class="{'active': (activeComponent.txt===component.txt) }"
            v-for="component in components" 
            @click.prevent="(activeComponent = component);">

            <i :class="component.icon" class="icon"></i>
            {{ component.txt }}

          </a>
        </div>
      </div>

      <!-- previewer for the components -->
      <div class="centered column">

        <div class="ui stacked segments" >
          <h4 class="ui top attached header">
            <i class="icon" :class="activeComponent.icon"></i> {{ activeComponent.txt }} Text Input
          </h4>

          <normal-input 
            v-if="(activeComponent.txt === 'Normal')"
            :properties="inputTemplates.normal"></normal-input>

          <normal-properties-editor 
            v-if="(activeComponent.txt === 'Normal')"
            :save="saveProps"></normal-properties-editor> 
          
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { textInput } from '../vuex/questionTypes.js'
import normalInput from '../components/text-input/NormalPreview.vue'
import normalPropertiesEditor from '../components/text-input/NormalPropertiesEditor.vue'


export default {
  name: 'textInput',
  components: {
    normalInput,
    normalPropertiesEditor
  },
  data() {
    return {
      components: [
        { txt: 'Normal', icon: 'text cursor' },
        { txt: 'Email', icon: 'at' },
        { txt: 'Url', icon: 'external' },
        { txt: 'Measure', icon: 'percent' },
        { txt: 'Phone', icon: 'call square' },
        { txt: 'Date', icon: 'calendar' },
        { txt: 'Time', icon: 'hourglass half' },
        { txt: 'Address', icon: 'building outline' },
        { txt: 'Paragraph', icon: 'text width' }
      ],
      activeComponent: { txt: 'Normal', icon: 'text cursor' },
      inputTemplates: Object.assign({}, textInput)
    }
  },
  methods: {
    saveProps(data) {
      this.inputTemplates[data.type] = Object.assign({}, data.props);
    }
  }
}
</script>

<style>
  #text-input-components{
    background: #FFF;
  }
</style>