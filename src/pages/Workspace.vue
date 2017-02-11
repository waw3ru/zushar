
<template>
<div class="ui container" id="workspace">

  <div class="ui grid">
    <div class="centered ten wide column" id="workspace-draft">
      <div 
        class="ui segments question-templates" 
        v-for="(question, $index) in questions" 
        :key="question.id" 
        :id="question.id">

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
            <date-input :properties="question" :picker_id="'date_'+$index"></date-input>
          </template>
          <template v-if="question.field == 'address'">
            <address-input :properties="question"></address-input>
          </template>
          <template v-if="question.field == 'paragraph'">
            <paragraph-input :properties="question" ></paragraph-input>
          </template>
          <template v-if="question.field == 'dropdown'">
            <dropdown :properties="question" ></dropdown>
          </template>
          <template v-if="question.field == 'multi-select'">
            <multi-select :properties="question" ></multi-select>
          </template>
          <template v-if="question.field == 'multi-choice'">
            <multi-choice :properties="question" ></multi-choice>
          </template>
        </div>
        <div class="ui bottom attached three item menu" 
          v-show="($store.state.workspace.status!=='preview')">
          <a class="item" id="edit-props" @click="editQuestion($index)">
            <i class="edit icon"></i>
            Edit Properties
          </a>
          <a class="item" @click="removeQuestion($index)">
            <i class="trash icon"></i>
            Remove Question
          </a>
          <a class="item move-question">
            <i class="move icon"></i>
            Move Question
          </a>
        </div>

      </div>

    </div>
    <transition name="workspaceLevel" mode="out-in">
      <div class="centered ten wide column" v-if="(questions.length < 1)">
        <h1 class="ui grey center aligned icon header">
          <i class="remove circle outline icon"></i>
          No
          Questions
          <p class="sub header">
            added to the workspace
          </p>
        </h1>
      </div>
    </transition>
  </div>

</div>
</template>

<script>
// drag-drop-sort modules
require('jquery-ui/jquery-ui.js')
require('jquery-ui/jquery.ui.touch-punch.js')

import { mapState } from 'vuex'
import normalInput from '../components/text-input/NormalPreview.vue'
import phoneInput from '../components/text-input/PhonePreview.vue'
import emailInput from '../components/text-input/EmailPreview.vue'
import urlInput from '../components/text-input/UrlPreview.vue'
import dateInput from '../components/text-input/DatePreview.vue'
import paragraphInput from '../components/text-input/ParagraphPreview.vue'
import measureInput from '../components/text-input/MeasurePreview.vue'
import addressInput from '../components/text-input/AddressPreview.vue'
import dropdown from '../components/selection/DropdownPreview.vue'
import multiSelect from '../components/selection/MultiselectPreview.vue'
import multiChoice from '../components/selection/MultichoicePreview.vue'

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
    addressInput,
    dropdown,
    multiSelect,
    multiChoice
  },
  computed: mapState({
    questions: state => state.workspace.form.questions
  }),
  methods: {
    editQuestion(index) {
      this.$store.commit('SELECT_QUESTION', index);
      this.$router.push({ name: 'editProperties' })
    },
    removeQuestion(index) {
      this.$store.dispatch('remove_question', {
        TYPE: 'REMOVE_QUESTION',
        index
      })

      this.$store.dispatch('create_alert', {
        TYPE: 'CREATE_ALERT',
        heading: 'Question removed',
        message: `Question #${index+1} is removed and questions reordered`,
        icon: 'remove',
        timeout: 2500,
        level: 'warning'
      });
    },
    sortQuestions(e, ui, ids) {
      this.$store.dispatch('sort_questions', {
        TYPE: 'SORT_QUESTIONS',
        ids
      })
    }
  },
  mounted() {  
    let $sortElem = $('#workspace-draft')
    let vm = this;
    $sortElem.sortable({
      appendTo: '#workspace',
      /** containment: '#workspace', **/ /* caused weird happenings on sorting */
      cursor: 'move',
      handle: `.move-question`
    })
    $sortElem.disableSelection()
    $sortElem.on( "sortupdate", function( event, ui ) {
      vm.sortQuestions(event, ui, $sortElem.sortable("toArray"));
    })
  }
}
</script>

<style>
  #workspace{
    background: #FFF;
    height: auto;
    border: 1px solid rgba(0,0,0,0.1);
    border-top: 4px solid #757575;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
  }
  .workspaceLevel-enter-active{
    animation: fadeIn .3s;
  }
  .workspaceLevel-leave-active{
    animation: fadeOut .3s;
  }
  .question-templates{
    background: #FFF;
  }
</style>