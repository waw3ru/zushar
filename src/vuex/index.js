
import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'
import moment from 'moment'
import * as db from './database'
import workspace from './workspace'
import zsrAlert from './zsrAlert'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    forms: []
  },
  modules: {
    workspace,
    zsrAlert
  },
  mutations: {
    LOAD_FORMS(state, forms) {
      state.forms = [];
      Vue.set(state, 'forms', forms);
    },
    UPDATE_FORM(state, payload) {
      Vue.set(state.forms, payload.index, payload.form);
    },
    REMOVE_FORM(state, id) {
      Vue.set(state, 'forms', state.forms.filter(form => (form.id !== id)))
    },
    CLEAR_FORMS(state) {
      state.forms = [];
    }
  },
  actions: {
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
    remove_form({ commit }, payload) {
      /*
      * @desc
      *   remove form from db[`forms`]
      *   clear the workspace on store and database
      * */
	    db.removeForm(payload.id);
	    commit(payload.TYPE, payload.id);
	    db.clearWorkspace();
	    commit('CLEAR_WORKSPACE');
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
	    db.clearWorkspace();
	    commit('CLEAR_WORKSPACE');
    }
  }
});

export default store