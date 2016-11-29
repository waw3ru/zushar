
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import QuestionTypes from './questionTypes';
import mutations from './mutations';

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
  mutations
})

export default store