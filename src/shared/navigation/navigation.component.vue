<template>
  <div class="flex justify-content-center">
    <pv-tab-menu :model="items" class="mt-6 mx-4" />
  </div>
</template>

<script>
export default {
  name: "navigation-shipment",
  data() {
    return {
      activeTab: 0,
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
