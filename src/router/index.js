import { createRouter, createWebHistory } from "vue-router";
import CustomerQuotation from "../customers/pages/customer-quotation.component.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: { name: "sign-in" }
  },
  {
    path: "/shipments/client",
    name: "client-shipments",
    component: () => import("../shipments/pages/shipments-form.component.vue"),
    props: { enableListDialogs: false },
  },
  {
    path: "/shipments/enterprise",
    name: "enterprise-shipments",
    component: () => import("../shipments/pages/shipments-form.component.vue"),
    props: { enableListDialogs: true },
  },
  {
    path: "/vehicles",
    name: "vehicles",
    component: () => import("../vehicles/pages/vehicles.component.vue"),
    props: { enableListDialogs: true },
  },
  {
    path: "/customers/:id/quotations",
    props: true,
    component: CustomerQuotation,
    children: [
      {
        path: "/customers/:id/quotations",
        name: "customer-quotations",
        props: true,
        component: () =>
          import(
            "../customers/pages/steps-quotation/quotation-shipment.step.vue"
          ),
      },
      {
        path: "/customer/:id/business-shipping",
        props: true,
        component: () =>
          import(
            "../customers/pages/steps-quotation/enterprise-shipping.step.vue"
          ),
      },
      {
        path: "/customer/:id/pick-up-detail",
        props: true,
        component: () =>
          import("../customers/pages/steps-quotation/pick-up-detail.step.vue"),
      },
      {
        path: "/customer/:id/destination-detail",
        props: true,
        component: () =>
          import(
            "../customers/pages/steps-quotation/destination-detail.step.vue"
          ),
      },
      {
        path: "/customer/:id/payment",
        props: true,
        component: () =>
          import(
            "../customers/pages/steps-quotation/payment-shipment.step.vue"
          ),
      },
    ],
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("../shared/pages/sign-in/sign-in.component.vue")
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("../shared/pages/sign-up/sign-up.component.vue")
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { left: 0, top: 0 };
  },
});

export default router;
