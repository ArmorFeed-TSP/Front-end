import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("../Home.component.vue")
    },
    {
      path: '/shipments/client',
      name: 'Client shipments',
      component: () => import("../Shipments/customer-shipments/pages/customer-shipments.component.vue"),
      props: { id: 1 }
    },
    {
      path: '/shipments/enterprise',
      name: 'Enterprise shipments',
      component: () => import("../Shipments/enterprise-shipments/pages/enterprise-shipments.component.vue"),
      props: { id: 1 }
    },
    {
      path: "/shipments/customer/shipmentDetail/:id",
      name: 'Customer shipment detail',
      component: () => import("../Shipments/customer-shipments/pages/customer-shipments-detail.component.vue")
    },
    {
      path: "/shipments/enterprise/shipmentDetail/:id",
      name: "Enterprise shipment detail",
      component: () => import("../Shipments/enterprise-shipments/pages/enterprise-shipments-detail.component.vue")
    }

    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

export default router
