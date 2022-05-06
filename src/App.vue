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
  <header>
    <pv-toolbar class="bg-white">
      <template #start>
        <pv-avatar class="m-auto">
          <img src="./assets/Logo.png" alt="Logo" />
        </pv-avatar>
        <h3 class="text-500">ArmorFeed</h3>
      </template>
      <template #end>
        <div class="flex-column">
          <pv-button class="bg-white border-0"
            ><i class="pi pi-bell text-500"></i
          ></pv-button>
          <pv-button class="bg-white border-0"
            ><i class="pi pi-cog text-500"></i
          ></pv-button>
          <pv-button class="text-500 bg-white border-0">Italo Silva</pv-button>
        </div>
      </template>
    </pv-toolbar>
  </header>
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
