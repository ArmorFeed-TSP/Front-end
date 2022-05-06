<template>
  <div class="my-7 flex flex-column">
    <pv-data-table :value="currentShipments" responsiveLayout="stack" :paginator="true" :rows="10">
      <pv-column v-for="col in columns" :field="col.field" :header="col.header" :key="col.field"></pv-column>
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button v-if="enableListDialogs" icon="pi pi-car" class="p-button-text p-button-rounded"/>
          <pv-button icon="pi pi-eye" class="p-button-text p-button-rounded" @click="showDialog"/>
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
    <pv-button v-if="enableListDialogs" icon="pi pi-plus" label="New Shipment" iconPos="right" class="my-5 mx-auto" @click="this.$emit('showDialog')"/>
  </div>
</template>

<script>
import { ShipmentsApiService } from "../service/Shipments-api.service"

export default {
  name: "shipments-list",
  data(){
    return {
      shipmentsService: null,
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
    this.shipmentsService = new ShipmentsApiService();
    this.shipmentsService.getAll().then(response => {
      this.shipments = response.data;
      this.currentShipments = this.shipments;
    });
  },
  props: {
    enableListDialogs: Boolean
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
    addNewItem(item,condition){
      if(!condition)
        return false;
      this.shipmentsService.create(item).then(response => {
        this.shipments = [...this.shipments,response.data];
        this.currentShipments = this.shipments;
      });
      return true;
    },
    showDialog(){
      this.dialogEnabled = !this.dialogEnabled;
    }
  }
}
</script>