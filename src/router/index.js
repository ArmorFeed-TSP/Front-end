import { createRouter, createWebHistory } from "vue-router";
import CustomerQuotation from "../customers/pages/customer-quotation.component.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/shipments/client",
      name: "Client shipments",
      component: () => import("../Shipments/pages/shipments.component.vue"),
      props: { enableListDialogs: false },
    },
    {
      path: "/shipments/enterprise",
      name: "Enterprise shipments",
      component: () => import("../Shipments/pages/shipments.component.vue"),
      props: { enableListDialogs: true },
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: () => import("../Vehicles/pages/vehicles.component.vue"),
      props: { enableListDialogs: true },
    },
    {
      path: "/steps",
      component: CustomerQuotation,
      children: [
        {
          path: "/quotations",
          name: "customer-quotation",
          component: () =>
            import(
              "../customers/pages/steps-quotation/quotation-shipment.step.vue"
            ),
        },
        {
          path: "/quotations/business-shipping",
          component: () =>
            import(
              "../customers/pages/steps-quotation/enterprise-shipping.step.vue"
            ),
        },
        {
          path: "/quotations/pick-up-detail",
          component: () =>
            import(
              "../customers/pages/steps-quotation/pick-up-detail.step.vue"
            ),
        },
        {
          path: "/quotations/destination-detail",
          component: () =>
            import(
              "../customers/pages/steps-quotation/destination-detail.step.vue"
            ),
        },
        {
          path: "/quotations/payment",
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
