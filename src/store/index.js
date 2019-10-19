import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import { languageDefault } from '@/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: [
    menu
  ],
  state: {
    language: languageDefault
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
