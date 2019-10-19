import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { languageDefault } from '@/config'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: languageDefault,
  fallbackLocale: languageDefault,
  messages: {
    es: require('./es.json')
  },
  silent: true
})

Vue.filter('translate', string => {
  return i18n.t(string)
})

export default i18n
