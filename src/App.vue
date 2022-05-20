<script>
import AppNavigation from "./shared/navigation/navigation.component.vue";
import AppFooter from "./shared/footer/footer.component.vue";
export default {
  name: "App",
  components: { AppNavigation, AppFooter },
  data() {
    return {
      items: [
        { label: "Quotation", icon: "pi pi-fw pi-home", to: "/quotations" },
        {
          label: "Client shipments",
          icon: "pi pi-fw pi-calendar",
          to: "/shipments/client",
        },
        {
          label: "Enterprise shipments",
          icon: "pi pi-fw pi-pencil",
          to: "/shipments/enterprise",
        },
        { label: "My vehicles", icon: "pi pi-fw pi-file", to: "/vehicles" },
      ],
    };
  },
};
</script>
<template>
  <div class="w-full">
    <app-navigation :items="items" :paramActiveTab="0"></app-navigation>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>
<style>
body {
  margin: 0 0;
}
</style>
