<template>
  <div class="my-7 flex flex-column">
    <DataTable :value="currentShipments" responsiveLayout="stack" :paginator="true" :rows="10">
      <Column v-for="col in columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
    <Button icon="pi pi-plus" label="New Shipment" iconPos="right" class="my-5 mx-auto"/>
  </div>
</template>

<script>
import { ShipmentsApiService } from "./service/Shipments-api.service"

export default {
  name: "ShipmentsList",
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
      currentShipments: []
    }
  },
  created(){
    this.shipmentsService = new ShipmentsApiService();
    this.shipmentsService.getAll().then(response => {
      this.shipments = response.data;
      this.currentShipments = this.shipments;
    });
  },
  methods: {
    filterContent(selected) {
      if(selected.code === 'Todo'){
        this.currentShipments = this.shipments;
        return;
      }
      this.currentShipments = this.shipments.filter( shipment => {
        return shipment.status === selected.code;
      });
    }
  }
}
</script>