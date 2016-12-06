
import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

Vue.use(Vuex)

import QuestionTypes from './questionTypes';
const store = new Vuex.Store({
  state: {
    form: {
      id: null,
      metadata: {
        name: null,
        timestamp: {
          creation: null,
          updated: null
        },
        creator: null,
        status: null
      },
      questions: []
    },
    selectedQuestion: null
  },
  mutations: {
    ADD_QUESTION(state, question) {
      state.form.questions = state.form.questions.concat(question)
    },
    EDIT_QUESTION(state, payload) {
      Vue.set(state.form.questions, payload.index, payload.question)
    },
    SELECT_QUESTION(state, index) {
      state.selectedQuestion = index
    }
  },
  actions: {
    add_question({ commit }, payload) {
      let question = Object.assign({}, payload.question)
      question.id = uuid.v4();
      question.addedBy = 'zushar'
      commit(payload.TYPE, question);
    },
    edit_question({ commit }, payload) {
      commit(payload.TYPE, {
        index: payload.id,
        question: payload.question
      });
    }
  }
})

export default store