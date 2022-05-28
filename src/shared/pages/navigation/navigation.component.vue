<template>
  <div class="navigation-container">
    <pv-tool-bar>
      <template #start>
        <a href="/" class="no-underline">
          <div class="flex align-items-center">
            <img
              class="logo"
              src="https://i.ibb.co/XkF6Dx6/Logo.png"
              alt="Logo of ArmorFeed"
            />
            <h1 class="text-lg text-black-alpha-70">ArmorFeed</h1>
          </div>
        </a>
      </template>
      <template #end>
        <pv-button
          v-if="userId"
          icon="pi pi-bell"
          @click="openNotification"
          class="p-button-rounded p-button-text"
        ></pv-button>
        <pv-button
          icon="pi pi-cog"
          class="p-button-rounded p-button-text p-toolbar-separator"
          @click="toggle"
        ></pv-button>
        <pv-button
          v-if="userId"
          class="p-button-rounded p-button-text"
          icon="pi pi-user"
          icon-pos="left"
          :label="userName"
        ></pv-button>
      </template>
    </pv-tool-bar>
    <pv-overlay-panel ref="op" style="width: 300px" :dismissable="true" el="el">
      <div class="p-fluid">
        <h3>Settings</h3>
        <pv-divider></pv-divider>
        <div class="field flex">
          <pv-button class="mr-1" icon="pi pi-sun" label="Light"></pv-button>
          <pv-button class="ml-1" icon="pi pi-moon" label="Dark"></pv-button>
        </div>
        <pv-divider></pv-divider>
        <div class="field" v-if="userId">
          <pv-button
            @click="logOut"
            icon="pi pi-power-off"
            class="p-button-text p-button-danger"
            label="Log Out"
          ></pv-button>
          <pv-divider></pv-divider>
        </div>
      </div>
    </pv-overlay-panel>
    <pv-overlay-panel ref="nt" style="width: 400px" :dismissable="true" el="el">
        <Notifications></Notifications>
    </pv-overlay-panel>
  </div>
  <div v-if="userId" class="flex justify-content-center">
    <pv-tab-menu :model="navigationList" :exact="false" />
  </div>
</template>

<script>
import Notifications from "../../../notifications/pages/notifications.vue";
export default {
  name: "navigation-shipment",
  components: { Notifications },
  data() {
    return {
      activeTab: 0,
      isDark: null,
      navigationEnterprise: [
        {
          label: "My shipments",
          icon: "pi pi-fw pi-calendar",
          to: "/enterprise/1/shipments",
        },
        { label: "My Vehicles", icon: "pi pi-car", to: "/enterprise/1/vehicles" },
        { label: "My Payments", icon: "pi pi-money-bill", to: "/enterprise/1/payments" },
      ],
      navigationCustomer: [
        { label: "Quotation", icon: "pi pi-fw pi-home", to: "/quotations" },
        { label: "My shipments", icon: "pi pi-fw pi-calendar" },
        { label: "My Payments", icon: "pi pi-money-bill", to: "" },
      ],
    };
  },
  methods: {
    toggle(event) {
      event.preventDefault();
      this.$refs.op.toggle(event);
    },
    openNotification(event) {
      event.preventDefault();
      this.$refs.nt.toggle(event);
    },
    async logOut() {
      await localStorage.removeItem("auth");
      await this.$emit("sign-off");
      await this.$router.push({ name: "root" });
      this.$refs.op.hide();
    },
  },
  computed: {
    navigationList() {
      return this.userType === "customer"
        ? this.navigationCustomer
        : this.navigationEnterprise;
    },
  },
  props: {
    items: Array,
    paramActiveTab: Number,
    userId: Number,
    userType: String,
    userName: String,
  },
  mounted() {
    this.activeTab = this.paramActiveTab;
  },
};
</script>

<style>
.navigation-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
.logo {
  height: 45px;
}
</style>
