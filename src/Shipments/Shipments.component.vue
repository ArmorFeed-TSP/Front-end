<template>
  <div class="container">
    <div class="flex flex-column space-between align-items-center">
      <ShipmentsFilter ref="ShipmentFilter" @click="filterData"></ShipmentsFilter>
      <ShipmentsList ref="ShipmentList"></ShipmentsList>
    </div>
  </div>
</template>

<script>
import ShipmentsFilter from "./Shipments-Filter.component.vue";
import ShipmentsList from "./Shipments-List.component.vue";

export default {
  name: "ShipmentsLayout",
  components: {
    ShipmentsFilter,
    ShipmentsList
  },
  methods: {
    filterData(){
      this.$refs.ShipmentList.filterContent(this.$refs.ShipmentFilter.selectedItem);
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