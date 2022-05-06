<template>
  <div class=" table my-7 flex flex-column">
    <pv-button
        v-if="enableListDialogs"
        icon="pi pi-plus"
        label="New Vehicle"
        iconPos="right"
        class="my-3 mx-auto button"
        @click="this.$emit('showDialog')"
    />
    <pv-data-table
      :value="currentVehicles"
      responsiveLayout="stack"
      :paginator="true"
      :rows="10"
    >
      <pv-column
        v-for="col in columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></pv-column>
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button
              v-if="enableListDialogs"
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
          />
          <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="showDialog"
          />
        </template>
      </pv-column>
    </pv-data-table>

  </div>
</template>

<script>
import { VehiclesApiService } from "../service/Vehicles-api.service";

export default {
  name: "vehicles-list",
  data() {
    return {
      vehiclesService: null,
      vehicles: [],
      columns: [
        { field: "id", header: "ID" },
        { field: "brand", header: "Brand" },
        { field: "licensePlate", header: "License Plate" },
        { field: "year", header: "Year" },
        { field: "model", header: "Model" },
        { field: "maintenanceDate", header: "Maintenance Date" },
      ],
      currentVehicles: [],
      dialogEnabled: false,
    };
  },
  created() {
    this.vehiclesService = new VehiclesApiService();
    this.vehiclesService.getAll().then((response) => {
      this.vehicles = response.data;
      this.currentVehicles = this.vehicles;
    });
  },
  props: {
    enableListDialogs: Boolean,
  },
  methods: {
    filterContent(status) {
      if (status === "All") {
        this.currentVehicles = this.vehicles;
        return;
      }
      this.currentVehicles = this.vehicles.filter((vehicle) => {
        return vehicle.status === status;
      });
    },
    addNewItem(item, condition) {
      if (!condition) return false;
      this.vehiclesService.create(item).then((response) => {
        this.vehicles = [...this.vehicles, response.data];
        this.currentVehicles = this.vehicles;
      });
      return true;
    },
    showDialog() {
      this.dialogEnabled = !this.dialogEnabled;
    },
  },
};
</script>
<style>

.button{
  position: absolute;
  left: 17rem;
}
</style>