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
        <div class="field">
          <pv-button
            @click="logOut"
            icon="pi pi-power-off"
            class="p-button-text p-button-danger"
            label="Log Out"
          ></pv-button>
        </div>
        <pv-divider></pv-divider>
      </div>
    </pv-overlay-panel>
  </div>
  <div v-if="userId" class="flex justify-content-center">
    <pv-tab-menu :model="items" :exact="false" />
  </div>
</template>

<script>
export default {
  name: "navigation-shipment",
  data() {
    return {
      activeTab: 0,
      user: null,
      userName: "User Name",
      isDark: null,
    };
  },
  methods: {
    toggle(event) {
      event.preventDefault();
      this.$refs.op.toggle(event);
    },
    async logOut() {
      await localStorage.removeItem("user");
      await localStorage.removeItem("accessToken");
      await this.$router.push({ name: "sign-in" });
    },
  },
  props: {
    items: Array,
    paramActiveTab: Number,
    userId: Number,
    userType: String,
  },
  mounted() {
    this.activeTab = this.paramActiveTab;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) this.userName = user.name;
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
