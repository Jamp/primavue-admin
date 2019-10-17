import Vue from 'vue'
import Router from 'vue-router'

import menuModule from '@/store/modules/menu'

Vue.use(Router)

const getRoutesFromMenu = (menu = [], routes = []) => {
  menu.forEach(item => {
    if (item.path) {
      routes.push(item)
    }

    if (item.children) {
      getRoutesFromMenu(item.children, routes)
    }
  })

  return routes
}

const getDefaultRoute = (menu = []) => {
  let defaultRoute

  for (let item of menu) {
    if (item.meta.default) {
      defaultRoute = item
      break
    } else if (item.children) {
      let defaultChild = item.children.find((i) => i.meta.default)
      defaultRoute = defaultChild || defaultRoute
      break
    }
  }

  return defaultRoute
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: {
        name: getDefaultRoute(menuModule.state.items).name
      }
    },
    ...getRoutesFromMenu(menuModule.state.items)
  ]
})

// router.beforeEach(Vue.auth.checkPermission)

export default router
