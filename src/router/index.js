import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: ()=> import("../vehicles/pages/vehicle-list.vue")
    },
  ]
})

export default router
