import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/'
import store from './store'

import Default from './layouts/default'
import System from './layouts/system'

import 'primevue/resources/themes/nova-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
// import '@fullcalendar/core/main.min.css'
// import '@fullcalendar/daygrid/main.min.css'
// import '@fullcalendar/timegrid/main.min.css'
import './assets/layout/layout.scss'

import i18n from './i18n'
import Auth from './plugins/auth'
Vue.use(Auth)
Vue.use(Vuelidate)

Vue.config.productionTip = false

router.beforeEach(Vue.auth.checkPermission)

Vue.component('default-layout', Default)
Vue.component('system-layout', System)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
