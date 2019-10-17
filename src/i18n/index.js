import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es: require('./es.json')
  },
  silent: true
})

Vue.filter('translate', string => {
  return i18n.t(string)
})

export default i18n
