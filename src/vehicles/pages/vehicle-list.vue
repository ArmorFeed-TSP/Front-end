<template>
  <div class="container flex flex-column space-between align-items-center">
    <div class="card flex-column my-7 flex ">
      <pv-data-table
          ref="dt"
          :value="vehicles"
          datakey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vehicles"
          responsiveLayout="stack"
      >
        <template #header>
          <div
              class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Vehicles</h5>
          </div>
          <pv-button
              label="New vehicle"
              icon="pi pi-plus"
              class="p-button-success mr-2"

              @click="openNew()"
          />
        </template>
        <pv-column
            field="brand"
            header="Brand"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="licensePlate"
            header="License Plate"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="year"
            header="Year"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>

        <pv-column
            field="model"
            header="Model"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="maintenanceDate"
            header="Maintenance Date"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>

        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
                icon="pi pi-pencil"
                class="p-button-text p-button-rounded"
            />
            <pv-button
                icon="pi pi-trash"
                class="p-button-text p-button-rounded"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>


<script>
import {VehiclesApiService} from "../services/vehicle-api.service";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "vehicle-list",
  data() {
    return {
      vehicles: [],
      vehicleDialog: false,
      vehicle: {},
      filters: {},
      submitted: false,
      vehicleService: null,
    };s
  },
  created() {
    this.vehiclesService = new VehiclesApiService();
    this.vehiclesService.getAll().then((response) => {
      this.vehicles = response.data;
      this.vehicles.forEach((vehicle) => this.getDisplayableVehicle(vehicle));
    });
    this.initFilters();
  },
  methods:{
    getDisplayableVehicle(vehicle) {
      this.vehicle.id = vehicle.id;
      return vehicle;
    },
    getStorableVehicle(displayableVehicle) {
      return {
        id: displayableVehicle.id,
        brand: displayableVehicle.brand,
        licensePlate: displayableVehicle.licensePlate,
        year: displayableVehicle.year,
        model: displayableVehicle.model,
        maintenanceDate: displayableVehicle.maintenanceDate,
      };
    },


    openNew() {
      this.vehicles = {};
      this.submitted = false;
      this.vehicleDialog = true;
    },
    hideDialog() {
      this.vehicleDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.vehicles.findIndex((vehicle) => vehicle.id === id);
    },
    saveVehicle() {
      this.submitted = true;
      if (this.vehicle.brand.trim()) {
        if (this.vehicle.id) {
          this.vehicle = this.getStorableVehicle(this.vehicle);
          this.vehiclesService
              .update(this.vehicle.id, this.vehicle)
              .then((response) => {
                this.vehicles[this.findIndexById(response.data.id)] =
                    this.getDisplayableVehicle(response.data);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Vehicle Updated",
                  life: 3000,
                });
                console.log(response);
              });
        } else {
          this.vehicle.id = 0;
          console.log(this.vehicle);
          this.vehicle = this.getStorableVehicle(this.vehicle);
          this.vehicleService.create(this.vehicle).then((response) => {
            this.vehicle = this.getDisplayableVehicle(response.data);
            this.vehicle.push(this.vehicle);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Vehicle Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.vehicleDialog = false;
        this.vehicle = {};
      }
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    }

  }
}
</script>


<style scoped>

</style>