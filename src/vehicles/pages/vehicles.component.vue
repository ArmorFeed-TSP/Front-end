<template>
  <div class="container">
    <div class="flex flex-column space-between align-items-center">
      <vehicles-list
        ref="VehicleList"
        :enableListDialogs="enableListDialogs"
        @showDialog="enableDialog"
      ></vehicles-list>
      <vehicles-form ref="VehicleForm" @submit="addNewItem"></vehicles-form>
    </div>
  </div>
</template>

<script>
import VehiclesList from "./vehicles-list.component.vue";
import VehiclesForm from "./vehicles-form.component.vue";

export default {
  name: "vehicles-enterprise",
  components: {
    VehiclesList,
    VehiclesForm,
  },
  props: {
    enableListDialogs: Boolean,
  },
  methods: {
    addNewItem() {
      const result = this.$refs.VehicleList.addNewItem(
        this.$refs.VehicleForm.vehicle,
        this.$refs.VehicleForm.isValid
      );
      if (result) {
        this.$refs.VehicleForm.vehicle = {};
        this.$refs.VehicleForm.enabled = false;
      }
    },
    enableDialog() {
      this.$refs.VehicleForm.enabled = true;
    },
  },
};
</script>
<style>
.container {
  background-color: #e5eced;
  color: #fff;
}
</style>
