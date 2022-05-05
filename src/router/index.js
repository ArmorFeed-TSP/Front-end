import { createRouter, createWebHistory } from "vue-router";
import CustomerQuotation from "../customers/pages/customer-quotation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/steps",
      component: CustomerQuotation,
      children: [
        {
          path: "/steps",
          component: () =>
            import("../customers/pages/steps-quotation/step-quotation.vue"),
        },
        {
          path: "/steps/business-shipping",
          component: () =>
            import("../customers/pages/steps-quotation/business-shipping.vue"),
        },
      ],
    },
  ],
});

export default router;
