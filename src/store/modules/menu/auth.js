import { LOGIN_ROUTE } from '@/router/constants'

export default {
  name: LOGIN_ROUTE.name,
  path: '/login',
  component: () => import('@/views/Login.vue'),
  meta: {
    default: true,
    notMenu: true,
    public: true
  }
}
