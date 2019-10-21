export default {
  name: 'Others',
  meta: {
    title: 'routes.others.name',
    icon: 'pi pi-fw pi-exclamation-triangle',
    profile: [
      'architect',
      'agent',
      'battery'
    ]
  },
  children: [
    {
      name: 'About',
      path: '/about',
      component: () => import('@/views/About.vue'),
      meta: {
        title: 'routes.others.children.about.name',
        icon: 'pi pi-fw pi-info',
        layout: 'matrix',
        profile: [
          'architect',
          'agent',
          'battery'
        ]
      }
    },
    {
      name: 'Github',
      meta: {
        title: 'routes.others.children.github.name',
        icon: 'pi pi-fw pi-external-link',
        url: 'https://github.com/Jamp/primavue-admin'
      }
    }
  ]
}
