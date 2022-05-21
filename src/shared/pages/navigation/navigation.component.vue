<template>
  <div class="navigation-container">
    <pv-tool-bar>
      <template #start>
        <a href="/public" class="no-underline">
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
        ></pv-button>
        <pv-button
            v-if="userId"
          class="p-button-rounded p-button-text"
          icon="pi pi-user"
          icon-pos="left"
          label="User Name"
        ></pv-button>
      </template>
    </pv-tool-bar>
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
      userId: null,
    };
  },
  props: {
    items: Array,
    paramActiveTab: Number,
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
