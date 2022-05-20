<script>
import navigation from "./shared/navigation/navigation.component.vue";
export default {
  name: "App",
  components: { navigation },
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
    <navigation :items="items" :paramActiveTab="0"></navigation>
    <router-view />
  </div>
</template>
<style>
body {
  margin: 0 0;
}
</style>
