
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
          <div class="ui center aligned basic segment">
            <button class="ui orange basic button" @click.prevent="addComponent">
              <i class="plus icon"></i>
              Add question to workspace
            </button>
            <button 
              class="ui   basic button" 
              @click="(activeComponent.showEditor = !activeComponent.showEditor)">
              <i class="edit icon"></i>
              Edit question properties
            </button>
          </div>

          <normal-input 
            v-if="(activeComponent.txt === 'Normal')"
            :properties="inputTemplates[activeComponent.txt.toLowerCase()]"></normal-input>
          
          <transition name="componentEditor">
            <normal-properties-editor 
              v-if="(activeComponent.txt === 'Normal')"
              v-show="activeComponent.showEditor"
              :save="saveProps"></normal-properties-editor> 
          </transition>

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
      activeComponent: { txt: 'Normal', icon: 'text cursor', showEditor: false },
      inputTemplates: Object.assign({}, textInput)
    }
  },
  methods: {
    saveProps(data) {
      this.inputTemplates[data.type] = Object.assign({}, data.props)
    },
    addComponent() {
      console.dir(this.inputTemplates[activeComponent.txt.toLowerCase()])
    }
  }
}
</script>

<style>
  #text-input-components{
    background: #FFF;
  }

  .componentEditor-enter-active{
    animation: fadeIn .5s;
  }
  .componentEditor-leave-active{
    animation: fadeOut .3s;
  }
</style>