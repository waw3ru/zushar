
import Vue from 'vue'
import uuid from 'uuid'
import moment from 'moment'
import * as db from './database'

export default {
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
        status: 'create'
    },
    mutations: {
        CHANGE_WORKSPACE_STATE(state, status) {
            state.status = status;
        },
        CREATE_FORM(state, payload) {
            state.form.id = payload.id;
            Vue.set(state.form, 'metadata', payload.metadata);
        },
        LOAD_FORM(state, form) {
            Vue.set(state, 'form', form);
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
        CLEAR_WORKSPACE(state) {
            Vue.set(state, 'form', {
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
            });
        },
        EDIT_CHOICE(state, payload) {
            Vue.set(state.form.questions[state.selectedQuestion].choices, payload.index, payload.choice)
        },
        ADD_CHOICE(state, payload) {
            let temp = [].concat(state.form.questions[state.selectedQuestion].choices);
            temp = temp.concat(payload);
            Vue.set(state.form.questions[state.selectedQuestion], 'choices', temp);
        },
        REMOVE_CHOICES(state, payload) {
            Vue.set(state.form.questions[state.selectedQuestion], 'choices', state.form.questions[state.selectedQuestion].filter( (val, id) => (payload.index!==id) ));
        }
    },
    actions: {
        add_question({ state, commit }, payload) {
            let question = Object.assign({}, payload.question);
            question.id = uuid.v4();
            question.addedBy = 'zushar';

            commit(payload.TYPE, question);
            db.saveWorkspace(state.form);
        },
        edit_question({ state, commit }, payload) {
            commit(payload.TYPE, {
                index: payload.id,
                question: payload.question
            });
            db.saveWorkspace(state.form);
        },
        remove_question({ state, commit }, payload) {
            commit(payload.TYPE, payload.index);
            db.saveWorkspace(state.form);
        },
        sort_questions({ state, commit }, payload) {
            commit(payload.TYPE, payload.ids);
            db.saveWorkspace(state.form);
        },
        create_form({ state, commit }, payload) {
            /*
            * @desc
            *   add form metadata to Store
            *   save the form to database db[`forms`]
            *   clear workspace and remove questions from database db[`questions`]
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
            commit('CLEAR_WORKSPACE');
            db.clearWorkspace();
        },
        load_form({ state, commit, rootState }, payload) {
            /*
            * @desc
            *   clear the workspace and clear all questions on db[`questions`]
            *   load questions from the rootState `forms`
            *   save the loaded questions
            *   change the state of the workspace to update 
            * */

            db.clearWorkspace();
            commit(payload.TYPE, rootState.forms[payload.index]);
            db.saveWorkspace(rootState.forms[payload.index]);
            commit('CHANGE_WORKSPACE_STATE', payload.status);
        }
    }
}