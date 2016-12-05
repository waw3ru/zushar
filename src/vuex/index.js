
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
    }
  },
  mutations: {
    ADD_QUESTION(state, question) {
      state.form.questions = (state.form.questions || []).concat(question)
    }
  },
  actions: {
    add_question({ commit }, payload) {
      let question = Object.assign({}, payload.question)
      question.id = uuid.v4();
      question.addedBy = 'zushar'
      commit(payload.TYPE, question);
    }
  }
})

export default store