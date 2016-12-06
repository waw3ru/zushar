
<template>
  <div class="ui container" id="text-input-components">
    <div class="ui two column grid">

      <!-- menu for text input components -->
      <div class="centered three wide column">
        <div class="ui secondary pointing vertical menu">
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
            <button class="ui orange labeled icon button"
              @click.prevent="addComponent">
              <i class="plus icon"></i>
              Add question to workspace
            </button>
          </div>
          <div class="ui basic segment">
              <h5 class="ui dividing header">Component Preview</h5>
              
               <template v-if="(activeComponent.txt === 'Normal')">
                <normal-input 
                  :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                </normal-input>
              </template>
              <template v-if="(activeComponent.txt === 'Email')">
                <email-input 
                  :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                </email-input>
              </template>
              <template v-if="(activeComponent.txt === 'Url')">
                <url-input 
                  :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                </url-input>
              </template>
              <template v-if="(activeComponent.txt === 'Phone')">
                <phone-input 
                  :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
                </phone-input>
              </template>
              <template v-if="(activeComponent.txt === 'Date')">
                <date-input 
                  :properties="inputTemplates[activeComponent.txt.toLowerCase()]"
                  :picker_id="picker_id">
                </date-input>
              </template>
              <template v-if="(activeComponent.txt === 'Paragraph')">
              <paragraph-input 
                :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
              </paragraph-input>
            </template>
            <template v-if="(activeComponent.txt === 'Measure')">
              <measure-input 
                :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
              </measure-input>
            </template>
            <template v-if="(activeComponent.txt === 'Address')">
              <address-input 
                :properties="inputTemplates[activeComponent.txt.toLowerCase()]">
              </address-input>
            </template>

          </div>
          <div class="ui secondary segment">
            <h5 class="ui grey dividing header">Component Properties Editor</h5>

            <template v-if="(activeComponent.txt === 'Normal')">
              <normal-properties-editor :save="saveProps"></normal-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Email')">
              <email-properties-editor :save="saveProps"></email-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Url')">
              <url-properties-editor :save="saveProps"></url-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Phone')">
              <phone-properties-editor :save="saveProps"></phone-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Date')">
              <date-properties-editor :save="saveProps"></date-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Paragraph')">
              <paragraph-properties-editor :save="saveProps"></paragraph-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Measure')">
              <measure-properties-editor :save="saveProps"></measure-properties-editor> 
            </template>
            <template v-if="(activeComponent.txt === 'Address')">
              <address-properties-editor :save="saveProps"></address-properties-editor> 
            </template>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { textInput } from '../vuex/questionTypes.js'
import uuid from 'uuid'

import normalInput from '../components/text-input/NormalPreview.vue'
import normalPropertiesEditor from '../components/text-input/NormalPropertiesEditor.vue'
import emailInput from '../components/text-input/EmailPreview.vue'
import emailPropertiesEditor from '../components/text-input/EmailPropertiesEditor.vue'
import urlInput from '../components/text-input/UrlPreview.vue'
import urlPropertiesEditor from '../components/text-input/UrlPropertiesEditor.vue'
import phoneInput from '../components/text-input/PhonePreview.vue'
import phonePropertiesEditor from '../components/text-input/PhonePropertiesEditor.vue'
import dateInput from '../components/text-input/DatePreview.vue'
import datePropertiesEditor from '../components/text-input/DatePropertiesEditor.vue'
import paragraphInput from '../components/text-input/ParagraphPreview.vue'
import paragraphPropertiesEditor from '../components/text-input/ParagraphPropertiesEditor.vue'
import measureInput from '../components/text-input/MeasurePreview.vue'
import measurePropertiesEditor from '../components/text-input/MeasurePropertiesEditor.vue'
import addressInput from '../components/text-input/AddressPreview.vue'
import addressPropertiesEditor from '../components/text-input/AddressPropertiesEditor.vue'

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
    phonePropertiesEditor,
    dateInput,
    datePropertiesEditor,
    paragraphInput,
    paragraphPropertiesEditor,
    measureInput,
    measurePropertiesEditor,
    addressInput,
    addressPropertiesEditor
  },
  data() {
    return {
      components: [
        { txt: 'Normal', icon: 'text cursor' },
        { txt: 'Email', icon: 'at' },
        { txt: 'Url', icon: 'external' },
        { txt: 'Phone', icon: 'call square' },
        { txt: 'Date', icon: 'calendar' },
        { txt: 'Paragraph', icon: 'text width' },
        { txt: 'Measure', icon: 'percent' },
        { txt: 'Address', icon: 'building outline' }
      ],
      activeComponent: { txt: 'Normal', icon: 'text cursor' },
      inputTemplates: Object.assign({}, textInput),
      picker_id: uuid.v4()
    }
  },
  methods: {
    saveProps(data, cb = function () {}) {
      this.inputTemplates[data.type] = Object.assign({}, data.props);
      cb();
    },
    addComponent() {
      let component = this.activeComponent.txt.toLowerCase();
      this.$store.dispatch('add_question', {
        TYPE: 'ADD_QUESTION',
        question: this.inputTemplates[component]
      })
      this.inputTemplates[component] = Object.assign({}, textInput[component]);
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