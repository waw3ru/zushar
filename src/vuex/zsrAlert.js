/*
* created by waweru
*
* @desc
*   vuex module for message displaying for zushar (name: zsrAlert)
*   allows for global control of the alerts in the whole application 
* */

import Vue from 'vue'
import uuid from 'uuid'

let alertTemplate = {
    id: null,
    message: null,
    icon: null,
    heading: null,
    level: null,
    timeout: null
}

export default {
    state: {
        alerts: []
    },
    mutations: {
        CREATE_ALERT(state, payload) {
            /*
            * @desc:
            *   where payload is an Object following the alert template
            * */
            Vue.set(state, 'alerts', state.alerts.concat(payload))
        },
        CLEAR_ALERT(state, payload) {
            Vue.set(state, 'alerts', state.alerts.filter(alert=>(alert.id!==payload)))
        }
    },
    actions: {
        create_alert({ commit }, payload) {

            let alert = Object.assign({}, alertTemplate, {
                id: uuid.v4(),
                message: payload.message,
                icon: (payload.icon || ''),
                heading: (payload.heading || ''),
                level: payload.level,
                timeout: payload.timeout
            })

            commit(payload.TYPE, alert);
        },
        clear_alert({ commit }, payload) {
            commit(payload.TYPE, payload.id);
        }
    },
    getters: {
        firstAlert: (state) => state.alerts[0]
    }
}