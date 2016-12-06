
<template>
<div class="ui container" id="workspace">
  <div class="ui grid">
    <div class="centered eight wide column">
      <div class="ui segments" v-for="(question, $index) in questions">

        <div class="ui basic segment">
          <h4 class="ui dividing header">Question #{{ $index+1 }}</h4>
          <template v-if="question.field == 'normal'">
            <normal-input :properties="question"></normal-input>
          </template>
          <template v-if="question.field == 'phone'">
            <phone-input :properties="question"></phone-input>
          </template>
          <template v-if="question.field == 'email'">
            <email-input :properties="question"></email-input>
          </template>
          <template v-if="question.field == 'url'">
            <url-input :properties="question"></url-input>
          </template>
          <template v-if="question.field == 'measure'">
            <measure-input :properties="question"></measure-input>
          </template>
          <template v-if="question.field == 'date'">
            <date-input :properties="question" :picker_id="question.id"></date-input>
          </template>
          <template v-if="question.field == 'address'">
            <address-input :properties="question" :picker_id="question.id"></address-input>
          </template>
          <template v-if="question.field == 'paragraph'">
            <paragraph-input :properties="question" ><paragraph-input>
          </template>
        </div>
        <div class="ui bottom attached three item menu">
          <a class="item" id="edit-props" @click="editQuestion($index)">
            <i class="edit icon"></i>
            Edit Properties
          </a>
          <a class="item">
            <i class="eye icon"></i>
            View Properties
          </a>
          <a class="item">
            <i class="trash icon"></i>
            Remove Question
          </a>
        </div>
      </div>
    </div>
    <div class="centered ten wide column" v-if="(questions.length < 1)">
      <h1 class="ui yellow center aligned icon header">
        <i class="remove circle outline icon"></i>
        No 
        Questions 
        <p class="sub header">
          added to the workspace
        </p>
      </h1>
    </div>
  </div>

</div>
</template>

<script>

import { mapState } from 'vuex'
import normalInput from '../components/text-input/NormalPreview.vue'
import phoneInput from '../components/text-input/PhonePreview.vue'
import emailInput from '../components/text-input/EmailPreview.vue'
import urlInput from '../components/text-input/UrlPreview.vue'
import dateInput from '../components/text-input/DatePreview.vue'
import paragraphInput from '../components/text-input/ParagraphPreview.vue'
import measureInput from '../components/text-input/MeasurePreview.vue'
import addressInput from '../components/text-input/AddressPreview.vue'

export default {
  name: 'Workspace',
  components: {
    normalInput,
    phoneInput,
    emailInput,
    urlInput,
    dateInput,
    paragraphInput,
    measureInput,
    addressInput
  },
  computed: {
    ...mapState({
      questions: state => state.form.questions
    })
  },
  methods: {
    editQuestion(index) {
      this.$store.commit('SELECT_QUESTION', index);
      this.$router.push({ name: 'editProperties' })
    }
  }
}
</script>

<style>
  #workspace{
    background: #FFF;
    border: 1px solid rgba(0,0,0,0.1);
    border-top: 3px solid #FF3D00;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>