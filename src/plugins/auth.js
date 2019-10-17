import { LOGIN_ROUTE, HOME_ROUTE } from '@/router/constants'

export default function (Vue) {
  Vue.auth = {
    isAuth () {

    },
    setProfile () {

    },
    getProfile () {

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
