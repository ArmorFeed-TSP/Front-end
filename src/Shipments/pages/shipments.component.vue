<template>
  <div class="container">
    <div class="flex flex-column space-between align-items-center">
      <shipments-filter ref="ShipmentFilter" @click="filterData"></shipments-filter>
      <shipments-list ref="ShipmentList" :enableListDialogs="enableListDialogs" @showDialog="enableDialog"></shipments-list>
      <shipments-form ref="ShipmentForm" @submit="addNewItem"></shipments-form>
    </div>
  </div>
</template>

<script>
import ShipmentsFilter from "./shipments-filter.component.vue";
import ShipmentsList from "./shipments-list.component.vue";
import ShipmentsForm from "./shipments-form.component.vue";

export default {
  name: "shipments",
  components: {
    ShipmentsFilter,
    ShipmentsList,
    ShipmentsForm
  },
  props: {
    enableListDialogs: Boolean
  },
  methods: {
    filterData(){
      this.$refs.ShipmentList.filterContent(this.$refs.ShipmentFilter.selectedItem);
    },
    addNewItem(){
      const result = this.$refs.ShipmentList.addNewItem(this.$refs.ShipmentForm.shipment,this.$refs.ShipmentForm.isValid);
      if(result){
        this.$refs.ShipmentForm.shipment = {};
        this.$refs.ShipmentForm.enabled = false;
      }
    },
    enableDialog(){
      this.$refs.ShipmentForm.enabled = true;
    }
  }
}
</script>
<style>
  .container {
    background-color: #E5ECED;
    color: #fff;
  }
</style>