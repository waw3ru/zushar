
<template>
  <div class="ui container" id="text-input-components">
    <div class="ui two column grid">

      <!-- menu for text input components -->
      <div class="centered three wide column">
        <div class="ui vertical menu">
          <div class="header item">Text Input Components</div>
          <a class="item" :class="{'blue active': (activeComponent.txt===component.txt) }"
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
            <i class="icon" :class="activeComponent.icon"></i> 
            {{ activeComponent.txt }} Text Input
          </h4>
          <div class="ui center aligned basic segment">
            <button class="ui orange basic button" @click.prevent="addComponent">
              <i class="plus icon"></i>
              Add question to workspace
            </button>
          </div>

          <template v-if="(activeComponent.txt === 'Normal')">
            <normal-input 
              :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
            </normal-input>
            <normal-properties-editor :save="saveProps"></normal-properties-editor> 
          </template>
          
          <template v-if="(activeComponent.txt === 'Email')">
            <email-input 
              :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
            </email-input>
            <email-properties-editor :save="saveProps"></email-properties-editor> 
          </template>
          
          <template v-if="(activeComponent.txt === 'Url')">
            <url-input 
              :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
            </url-input>
            <url-properties-editor :save="saveProps"></url-properties-editor> 
          </template>

          <template v-if="(activeComponent.txt === 'Phone')">
            <phone-input 
              :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
            </phone-input>
            <phone-properties-editor :save="saveProps"></phone-properties-editor> 
          </template>
          


        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { textInput } from '../vuex/questionTypes.js'
import normalInput from '../components/text-input/NormalPreview.vue'
import normalPropertiesEditor from '../components/text-input/NormalPropertiesEditor.vue'
import emailInput from '../components/text-input/EmailPreview.vue'
import emailPropertiesEditor from '../components/text-input/EmailPropertiesEditor.vue'
import urlInput from '../components/text-input/UrlPreview.vue'
import urlPropertiesEditor from '../components/text-input/UrlPropertiesEditor.vue'
import phoneInput from '../components/text-input/PhonePreview.vue'
import phonePropertiesEditor from '../components/text-input/PhonePropertiesEditor.vue'

export default {
  name: 'textInput',
  components: {
    normalInput,
    normalPropertiesEditor,
    emailInput,
    emailPropertiesEditor,
    urlInput,
    urlPropertiesEditor,
    phoneInput,
    phonePropertiesEditor
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
    saveProps(data, cb = function () {}) {
      this.inputTemplates[data.type] = Object.assign({}, data.props);
      cb();
    },
    addComponent() {
      console.dir(this.inputTemplates[this.activeComponent.txt.toLowerCase()])
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