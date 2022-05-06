import { createRouter, createWebHistory } from "vue-router";
import CustomerQuotation from "../customers/pages/customer-quotation.component.vue";

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
            import(
              "../customers/pages/steps-quotation/quotation-shipment.step.vue"
            ),
        },
        {
          path: "/steps/business-shipping",
          component: () =>
            import(
              "../customers/pages/steps-quotation/business-shipping.step.vue"
            ),
        },
        {
          path: "/steps/pick-up-detail",
          component: () =>
            import(
              "../customers/pages/steps-quotation/pick-up-detail.step.vue"
            ),
        },
        {
          path: "/steps/destination-detail",
          component: () =>
            import(
              "../customers/pages/steps-quotation/destination-detail.step.vue"
            ),
        },
        {
          path: "/steps/payment",
          component: () =>
            import(
              "../customers/pages/steps-quotation/payment-shipment.step.vue"
            ),
        },
      ],
    },
  ],
});

export default router;
