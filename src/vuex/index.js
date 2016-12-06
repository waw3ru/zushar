
import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

Vue.use(Vuex);

// import { Forms, Questions } from './database'

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
    selectedQuestion: null
  },
  mutations: {
    CREATE_FORM(state, metadata) {
      Vue.set(state.form, 'metadata', metadata)
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
    }
  },
  actions: {
    create_form({ state, commit }, payload) {
      commit(payload.TYPE, payload.metadata);
      // insert the form to database
      // Forms.insert(state.form)
    },
    add_question({ state, commit }, payload) {
      let question = Object.assign({}, payload.question);
      question.id = uuid.v4();
      question.addedBy = 'zushar';
      commit(payload.TYPE, question);
      // Questions.insert(state.questions)
    },
    edit_question({ commit }, payload) {
      commit(payload.TYPE, {
        index: payload.id,
        question: payload.question
      });
    },
    remove_question({ commit }, payload) {
      commit(payload.TYPE, payload.index)
    },
    sort_questions({ commit }, payload) {
      commit(payload.TYPE, payload.ids)
    }
  }
});

export default store