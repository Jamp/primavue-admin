import { LOGIN_ROUTE, HOME_ROUTE } from '@/router/constants'
import { sessionNamespace } from '../config'

export default function (Vue) {
  Vue.auth = {
    login (email, password) {
      Vue.auth.setProfile({
        name: 'Pepito José',
        email: email,
        session: sessionNamespace
      })

      return true
    },
    google () {
      return 'https://url.login.google.com'
    },
    logout () {
      return sessionStorage.removeItem(sessionNamespace)
    },
    isAuth () {
      return !!Vue.auth.getProfile()
    },
    setProfile (profile) {
      sessionStorage.setItem(sessionNamespace, profile)
    },
    getProfile () {
      return sessionStorage.getItem(sessionNamespace) || null
    },
    checkPermission (to, from, next) {
      if (!to.meta.public && !Vue.auth.isAuth()) {
        next(LOGIN_ROUTE)
      }

      if (to.name === LOGIN_ROUTE.name && Vue.auth.isAuth()) {
        next(HOME_ROUTE)
      }

      next()
    }
  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => Vue.auth
    }
  })
}
