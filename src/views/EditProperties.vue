<template>
<div class="ui container" id="workspace-editor">

  <div class="ui grid">
    <div class="centered ten wide column">
      <router-link tag="button" class="ui left floated basic button" :to="{ name: 'Workspace' }">
        <i class="chevron left icon"></i> Return to workspace
      </router-link>
    </div>

    <div class="centered eight wide column" v-if="question">
      <div class="ui basic segment">
        <h3 class="ui header">
          Editing Question #{{ $store.state.selectedQuestion+1 }}
          <p class="sub header">Question type: {{ question.field }} from {{ question.fieldType }} components</p>
        </h3>

          <template v-if="(question.field === 'normal')">
            <normal-properties-editor :save="saveProps" :properties="question">
            </normal-properties-editor> 
          </template>
          <template v-if="(question.field === 'email')">
            <email-properties-editor 
              :save="saveProps" :properties="question">
            </email-properties-editor> 
          </template>
          <template v-if="(question.field === 'url')">
            <url-properties-editor 
              :save="saveProps" :properties="question">
            </url-properties-editor> 
          </template>
          <template v-if="(question.field === 'phone')">
            <phone-properties-editor 
              :save="saveProps" :properties="question">
            </phone-properties-editor> 
          </template>
          <template v-if="(question.field === 'date')">
            <date-properties-editor 
              :save="saveProps" :properties="question">
            </date-properties-editor> 
          </template>
          <template v-if="(question.field === 'paragraph')">
            <paragraph-properties-editor 
              :save="saveProps" :properties="question">
            </paragraph-properties-editor> 
          </template>
          <template v-if="(question.field === 'measure')">
            <measure-properties-editor 
              :save="saveProps" :properties="question">
            </measure-properties-editor> 
          </template>
          <template v-if="(question.field === 'address')">
            <address-properties-editor :save="saveProps" :properties="question"></address-properties-editor> 
          </template>
      </div>
    </div>

    <div class="centered ten wide column" v-if="!question">
      <h1 class="ui red center aligned icon header">
        <i class="remove circle outline icon"></i>
        No 
        Question 
        <p class="sub header">
          selected for editing.
        </p>
      </h1>
    </div>

  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as Questions from '../vuex/questionTypes'
import normalPropertiesEditor from '../components/text-input/NormalPropertiesEditor.vue'
import emailPropertiesEditor from '../components/text-input/EmailPropertiesEditor.vue'
import urlPropertiesEditor from '../components/text-input/UrlPropertiesEditor.vue'
import phonePropertiesEditor from '../components/text-input/PhonePropertiesEditor.vue'
import datePropertiesEditor from '../components/text-input/DatePropertiesEditor.vue'
import paragraphPropertiesEditor from '../components/text-input/ParagraphPropertiesEditor.vue'
import measurePropertiesEditor from '../components/text-input/MeasurePropertiesEditor.vue'
import addressPropertiesEditor from '../components/text-input/AddressPropertiesEditor.vue'

export default {
  name: 'editProperties',
  components: {
    normalPropertiesEditor,
    emailPropertiesEditor,
    urlPropertiesEditor,
    phonePropertiesEditor,
    datePropertiesEditor,
    paragraphPropertiesEditor,
    measurePropertiesEditor,
    addressPropertiesEditor
  },
  computed: {
    question() {
      if (this.$store.state.selectedQuestion) {
        return this.$store.state.form.questions[this.$store.state.selectedQuestion]
      }
      else {
        return null;
      }
    }
  },
  methods:{
    saveProps(data, cb=function() {}) { 
      this.$store.dispatch('edit_question', {
        TYPE: 'EDIT_QUESTION',
        id: this.$store.state.selectedQuestion,
        question: data.props
      })
      this.$router.push({ name: 'Workspace' })
    }
  }
}
</script>

<style>
#workspace-editor{
  background: #FFF;
  border: 1px solid rgba(0,0,0,0.1);
  border-top: 3px solid #01579B;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>