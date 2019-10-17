import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: [
    menu
  ],
  state: {
    language: null
  },
  getters: {
    lang: state => state.language
  },
  mutations: {

  },
  actions: {

  }
})

export default store
