import { HOME_ROUTE } from '@/router/constants'

export default {
  name: HOME_ROUTE.name,
  path: '/home',
  component: () => import('@/views/Home.vue'),
  meta: {
    title: 'menu.dashboard',
    layout: 'system',
    profile: [
      'admin',
      'client',
      'user'
    ]
  }
}
