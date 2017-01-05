/*
* created by waweru
*
* @desc
*   vuex module for message displaying for zushar (name: zsrAlert)
*   allows for global control of the alerts in the whole application 
* */

import Vue from 'vue'

export default {
    state: {
        content: {
            message: null,
            icon: null,
            heading: null,
        },
        level: null,
        isActive: false
    },
    mutations: {
        CREATE_ALERT(state, payload) {
            state.level = (payload.level) ? payload.level : 'normal';
            state.isActive = true;
            Vue.set(state, 'content', payload.content)
        },
        CLEAR_ALERT(state) {
            state.level = null;
            state.isActive = false;            
            Vue.set(state, 'content', {
                message: null,
                icon: null,
                heading: null,
            });
        }
    },
    actions: {
        alert({ commit }, payload) {
            /*
            * @desc: 
            *   set a timer to call the CLEAR_ALERT mutation
            *   this allows for the automatic termination of alert after a timeout set by the 
            *   component which dispatched the alert.
            * */
            setTimeout(() => {
                commit('CLEAR_ALERT');
            }, payload.timeout);

            if (!_.isEmpty(payload.alert.content.message) || !_.isEmpty(payload.alert.content.heading)) {
                commit(payload.TYPE, payload.alert);
            }
        }
    }
}