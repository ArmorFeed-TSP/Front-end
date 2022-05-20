<script>
import AppNavigation from "./shared/navigation/navigation.component.vue";
import AppFooter from "./shared/footer/footer.component.vue";
export default {
  name: "App",
  components: { AppNavigation, AppFooter },
  data() {
    return {
      typeUser: "customer",
      navigationEnterprise: [
        {
          label: "My Shipments",
          icon: "pi pi-fw pi-calendar",
          to: "/shipments/enterprise",
        },
        { label: "My Vehicles", icon: "pi pi-car", to: "/vehicles" },
        { label: "My Payments", icon: "pi pi-money-bill", to: "" },
      ],
      navigationCustomer: [
        { label: "Quotation", icon: "pi pi-fw pi-home", to: "/quotations" },
        { label: "My Shipments", icon: "pi pi-fw pi-calendar" },
        { label: "My Payments", icon: "pi pi-money-bill", to: "" },
      ],
    };
  },
};
</script>
<template>
  <div class="w-full">
    <app-navigation
      v-if="typeUser === 'customer'"
      :items="navigationCustomer"
      :paramActiveTab="0"
    ></app-navigation>
    <app-navigation
      v-else-if="typeUser === 'enterprise'"
      :items="navigationEnterprise"
      :paramActiveTab="0"
    ></app-navigation>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>
<style>
body {
  margin: 0 0;
}
</style>
