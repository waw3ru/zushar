
import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

Vue.use(Vuex);

import * as db from './database'

const store = new Vuex.Store({
  state: {
    form: {
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
    selectedQuestion: null,
    forms: []
  },
  mutations: {
    CREATE_FORM(state, metadata) {
      Vue.set(state.form, 'metadata', metadata)
    },
    LOAD_FORMS(state, forms) {
      state.forms = [];
      Vue.set(state, 'forms', forms);
    },
    ADD_QUESTION(state, question) {
	    Vue.set(state.form, 'questions', state.form.questions.concat(question))
    },
    EDIT_QUESTION(state, payload) {
      Vue.set(state.form.questions, payload.index, payload.question)
    },
    SELECT_QUESTION(state, index) {
      state.selectedQuestion = index
    },
    REMOVE_QUESTION(state, index) {
      Vue.set(state.form, 'questions', state.form.questions.filter( (val, id) => (index !== id) ))
    },
    SORT_QUESTIONS(state, ids) {
      Vue.set(state.form, 'questions', ids.map( id => (state.form.questions[_.findIndex(state.form.questions, ['id', id])]) ))
    },
    LOAD_QUESTIONS(state, questions) {
      state.forms.questions = []; // empty array to load new set of questions
      Vue.set(state.form, 'questions', questions);
    }
  },
  actions: {
    add_question({ state, commit }, payload) {
      let question = Object.assign({}, payload.question);
      question.id = uuid.v4();
      question.addedBy = 'zushar';

	    commit(payload.TYPE, question);
      db.saveQuestions(state.form.questions);
    },
    edit_question({ state, commit }, payload) {
      commit(payload.TYPE, {
        index: payload.id,
        question: payload.question
      });
	    db.saveQuestions(state.form.questions);
    },
    remove_question({ state, commit }, payload) {
      commit(payload.TYPE, payload.index);
	    db.saveQuestions(state.form.questions);
    },
    sort_questions({ state, commit }, payload) {
      commit(payload.TYPE, payload.ids);
	    db.saveQuestions(state.form.questions);
    }
  }
});

export default store