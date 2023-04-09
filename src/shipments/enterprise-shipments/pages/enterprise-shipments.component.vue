<template>
  <div class="container">
    <div class="flex flex-column space-between align-items-center" style="max-width: 45rem; width: 100%; margin: 0 auto; min-height: 90vh">
      <enterprise-shipments-list ref="enterpriseShipmentList" :id="this.id"></enterprise-shipments-list>
    </div>
  </div>
</template>

<script>
import EnterpriseShipmentsList from './enterprise-shipments-list.component.vue';

export default {
  name: "shipments-component",
  components: {
    EnterpriseShipmentsList
  },
  methods: {
    filterData(){
      this.$refs.enterpriseShipmentList.filterContent(this.$refs.enterpriseShipmentFilter.selectedItem);
    }
  },
  props: {
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
