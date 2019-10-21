export default {
  name: 'Hello',
  path: '/hello',
  component: () => import('@/views/Hello.vue'),
  meta: {
    title: 'routes.hello.name',
    icon: 'pi pi-fw pi-cloud',
    layout: 'matrix',
    profile: [
      'architect',
      'agent',
      'battery'
    ]
  }
}
