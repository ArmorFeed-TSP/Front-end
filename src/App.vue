<script>
import AppNavigation from "./shared/pages/navigation/navigation.component.vue";
import AppFooter from "./shared/pages/footer/footer.component.vue";
export default {
  name: "App",
  components: { AppNavigation, AppFooter },
  data() {
    return {
      userType: "customer",
      userId: null,
      navigationEnterprise: [
        {
          label: "My shipments",
          icon: "pi pi-fw pi-calendar",
          to: "/shipments/enterprise",
        },
        { label: "My Vehicles", icon: "pi pi-car", to: "/vehicles" },
        { label: "My Payments", icon: "pi pi-money-bill", to: "" },
      ],
      navigationCustomer: [
        { label: "Quotation", icon: "pi pi-fw pi-home", to: "/quotations" },
        { label: "My shipments", icon: "pi pi-fw pi-calendar" },
        { label: "My Payments", icon: "pi pi-money-bill", to: "" },
      ],
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userId = user.id;
      this.userType = user.userType;
    }
  },
};
</script>
<template>
  <div class="w-full">
    <app-navigation
      v-bind:user-id="userId"
      v-bind:user-type="userType"
      v-if="userType === 'customer'"
      :items="navigationCustomer"
      :paramActiveTab="0"
    ></app-navigation>
    <app-navigation
      v-bind:user-id="userId"
      v-bind:user-type="userType"
      v-else-if="userType === 'enterprise'"
      :items="navigationEnterprise"
      :paramActiveTab="0"
    ></app-navigation>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
<style>
body {
  margin: 0 0;
}
</style>
