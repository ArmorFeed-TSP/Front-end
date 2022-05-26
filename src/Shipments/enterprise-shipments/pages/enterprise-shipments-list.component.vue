<template>
  <div class="my-7 flex flex-column">
    <pv-data-table :value="currentShipments" responsiveLayout="stack" :paginator="true" :rows="10">
      <pv-column v-for="col in columns" :field="col.field" :header="col.header" :key="col.field"></pv-column>
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button icon="pi pi-car" class="p-button-text p-button-rounded"/>
          <router-link :to="`/shipments/enterprise/shipmentDetail/${slotProps.data.id}`"><pv-button icon="pi pi-eye" class="p-button-text p-button-rounded"/></router-link>
        </template>
      </pv-column>
    </pv-data-table>
    <pv-dialog v-model:visible="dialogEnabled">
      <template #header>
        <h3>Current Location</h3>
      </template>
      <!-- Google Api content goes here -->
      <template #footer>
        <pv-button label="Ok" autofocus @click="showDialog"/>
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { EnterpriseShipmentsService } from "../services/enterprise-shipments.service"

export default {
  name: "enterprise-shipments-list",
  data(){
    return {
      enterpriseShipmentsService: null,
      shipments: [],
      columns: [
        {field: 'id', header: 'Code'},
        {field: 'origin', header: 'Origin'},
        {field: 'pickUpDate', header: 'Pick Up Date'},
        {field: 'destiny', header: 'Destiny'},
        {field: 'deliveryDate', header: 'Delivery Date'},
        {field: 'status', header: 'Status'}
      ],
      currentShipments: [],
      dialogEnabled: false
    }
  },
  created(){
    this.enterpriseShipmentsService = new EnterpriseShipmentsService();
    this.enterpriseShipmentsService.getShipmentsById(this.id).then(response => {
      this.shipments = response.data;
      this.currentShipments = this.shipments;
    });
  },
  methods: {
    filterContent(status) {
      if(status === 'All'){
        this.currentShipments = this.shipments;
        return;
      }
      this.currentShipments = this.shipments.filter( shipment => {
        return shipment.status === status;
      });
    },
    showDialog(){
      this.dialogEnabled = !this.dialogEnabled;
    }
  },
  props: {
    id: Number
  }
}
</script>