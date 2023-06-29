<script>
import {EnterpriseShipmentsService} from "@/shipments/enterprise-shipments/services/enterprise-shipments.service";
import { EnterpriseShipmentDriverApiService } from "@/shipment-driver/enterprise-shipment-drivers/services/EnterpriseShipmentDriverApiService";

export default {
  name: "enterprise-shipment-driver-shipment-list",
  data() {
    return {
      availableShipments: [],
      shipmentDriverShipments: [],
      enterpriseShipmentsService: new EnterpriseShipmentsService(),
      columns: [
        { field: "id", header: "Code" },
        { field: "origin", header: "Origin" },
        { field: "pickUpDate", header: "Pick Up Date" },
        { field: "destiny", header: "Destiny" },
        { field: "deliveryDate", header: "Delivery Date" },
        { field: "status", header: "Status" },
      ],
      shipmentDriverId: null,
      enterpriseId: null,
    }
  },
  created() {
    this.enterpriseId = this.$route.params.enterpriseId;
    this.shipmentDriverId = this.$route.params.shipmentDriverId;
    this.enterpriseShipmentDriverApiService.findAvailableEnterpriseShipments(this.enterpriseId)
        .then(response => {
          this.availableShipments = response.data;
        })
        .catch(error => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "An error occured",
            detail: "An error occurred while trying to fetch shipments data",
            life: 3000,
          });
        });
    this.enterpriseShipmentDriverApiService.findShipmentsByShipmentDriverId(this.shipmentDriverId)
        .then( response => {
          this.shipmentDriverShipments = response.data;
        })
        .catch( error => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "An error occured",
            detail: "An error occurred while trying to fetch shipments data",
            life: 3000,
          });
        });
  },
  methods: {
    updateShipment(shipment) {
      if(this.shipmentDriverShipments.length >= 1) {
        this.$toast.add({
          severity: "info",
          summary: "This action is not available",
          detail: "A shipment driver can be asigned to only one shipment",
          life: 3000,
        });
        return;
      }
      // Assigning a shipment id in a shipment
      shipment.shipmentDriverId = this.shipmentDriverId;
      const enterpriseShipmentsApiService = new EnterpriseShipmentsService();
      enterpriseShipmentsApiService.updateShipment(shipment.id, shipment)
          .then(response => {
            this.shipmentDriverShipments = [...this.shipmentDriverShipments, response.data];
            console.log(this.shipmentDriverShipments);
            this.availableShipments = this.availableShipments.filter(shipment => shipment.id != response.data.id);
            this.$toast.add({
              severity: "success",
              summary: "Shipment assigned to a Shipment Driver successfully",
              detail: "Now yout can track shipment location and status",
              life: 3000,
            });
          })
          .catch( error => {
            console.error(error);
            this.$toast.add({
              severity: "error",
              summary: "An error occured",
              detail: "An error occured while trying to update shipment data",
              life: 3000,
            });
          });
    },
  }
}
</script>

<template>

</template>

<style>
.container {
  background-color: #e5eced;
  color: #fff;
}
.datatable-title {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 2rem;
  color: #444;
}
</style>