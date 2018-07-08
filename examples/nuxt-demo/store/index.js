import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    authenticated: false
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    login (state) {
      state.authenticated = true
    }
  }
})

export default store