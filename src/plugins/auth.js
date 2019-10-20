import { LOGIN_ROUTE, HOME_ROUTE } from '@/router/constants'
import { sessionNamespace } from '../config'

export default function (Vue) {
  Vue.auth = {
    async login (email, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(email)
          if (email === 'h@i.com' && password === '123456') {
            const profile = {
              uid: 'h12kj312kjh3kj1h23',
              photoURL: 'https://avataaars.io/?avatarStyle=Circle',
              displayName: 'Pepito José',
              emailVerified: false,
              email: email
            }
            Vue.auth.setProfile(profile)

            resolve(profile)
          } else {
            resolve(false)
          }
        }, 5000)
      })
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
      sessionStorage.setItem(sessionNamespace, JSON.stringify(profile))
    },
    getProfile () {
      let profile = sessionStorage.getItem(sessionNamespace)
      return (profile) ? JSON.parse(profile) : null
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
