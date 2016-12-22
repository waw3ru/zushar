
import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'
import moment from 'moment'

Vue.use(Vuex);

import * as db from './database'

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
        status: null,
        description: null
      },
      questions: []
    },
    selectedQuestion: null,
    forms: []
  },
  mutations: {
    CREATE_FORM(state, payload) {
      state.form.id = payload.id;
	    Vue.set(state.form, 'metadata', payload.metadata);
    },
    LOAD_FORMS(state, forms) {
      state.forms = [];
      Vue.set(state, 'forms', forms);
    },
    LOAD_FORM(state, form) {
      Vue.set(state, 'form', form);
    },
    UPDATE_FORM(state, payload) {
      Vue.set(state.forms, payload.index, payload.form);
    },
    REMOVE_FORM(state, id) {
      Vue.set(state, 'forms', state.forms.filter(form => (form.id !== id)))
    },
    CLEAR_FORMS(state) {
      state.forms = [];
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
      Vue.set(state.form, 'questions', questions);
    },
    CLEAR_QUESTIONS(state) {
      Vue.set(state.form, 'questions', []);
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
    },
    create_form({ state, commit }, payload) {
      /*
      * @desc
      *   add form metadata to Store
      *   save the form to database db[`forms`]
      *   clear workspace and remove questions from database db[`questions`]
      *   load questions from database to form.questions on store
      * */
      let metadata = Object.assign({}, payload.metadata, {
        timestamp: {
          creation: moment().format('YYYY/MM/DD'),
          updated: null
        },
        creator: 'zushar',
        status: 'draft'
      });
      commit(payload.TYPE, { id: uuid.v4(), metadata });
      db.saveForm(state.form);
      commit('CLEAR_QUESTIONS');
      db.clearAllQuestions();
	    commit('LOAD_QUESTIONS', db.getQuestions());
    },
    load_forms({ commit }, payload) {
      /*
      * @status
      *   bug
      * @code
      *   db.clearAllQuestions();
      *    commit('LOAD_QUESTIONS', db.getQuestions());
      *
      * @desc
      *   was suppose to clear the workspace and clear all questions on db[`questions`]
      *   load all questions from db[`questions`] on to the form.questions on store
      *
      * */
      commit('CLEAR_FORMS');
      commit(payload.TYPE, payload.forms);
    },
    load_form({ state, commit }, payload) {
	    /*
      * @desc
      *   clear the workspace and clear all questions on db[`questions`]
      *   save new questions to db[`questions`]
      *   load all questions from db[`questions`] on to the form.questions on store
      * */

	    db.clearAllQuestions();
      commit(payload.TYPE, state.forms[payload.index]);
      db.saveQuestions(state.forms[payload.index].questions);
      commit('LOAD_QUESTIONS', db.getQuestions());
    },
    remove_form({ commit }, payload) {
      /*
      * @desc
      *   remove form from db[`forms`]
      *   clear the workspace and clear all questions on db[`questions`]
      *   load all questions from db[`questions`] on to the form.questions on store
      * */
	    db.removeForm(payload.id);
	    commit(payload.TYPE, payload.id);
	    db.clearAllQuestions();
	    commit('LOAD_QUESTIONS', db.getQuestions());
    },
    update_form({ state, commit }, payload){
      /*
      * @desc
      *   Update the form on database db[`forms`]
      *   update form on store (store.forms<Array>)
      *   clear the workspace and clear all questions on db[`questions`]
      *   load all questions from db[`questions`] on to the form.questions on store
      * */

      let form = Object.assign({}, state.form, {
        'metadata.timestamp.updated': moment().format('YYYY/MM/DD')
      });
      db.updateForm(form.id, form);
      commit(payload.TYPE, {
        index: _.findIndex(state.forms, ['id', form.id]),
        form: form
      });
      db.clearAllQuestions();
	    commit('LOAD_QUESTIONS', db.getQuestions());
    }
  }
});

export default store