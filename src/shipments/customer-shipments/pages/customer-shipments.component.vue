<template>
  <div class="container">
    <div class="flex flex-column space-between align-items-center" style="max-width: 80rem; width: 100%; margin: 0 auto; min-height: 90vh">
      <customer-shipments-list ref="customerShipmentList" :id="this.id"></customer-shipments-list>
    </div>
  </div>
</template>

<script>
import CustomerShipmentsList from "./customer-shipments-list.component.vue";

export default {
  name: "shipments-component",
  components: {
    CustomerShipmentsList
  },
  methods: {
    filterData(){
      this.$refs.customerShipmentList.filterContent(this.$refs.customerShipmentFilter.selectedItem);
    }
  },
  props : {
    id: Number
  }
}
</script>
<style>
.container {
  background-color: #E5ECED;
  color: #fff;
}
</style>
