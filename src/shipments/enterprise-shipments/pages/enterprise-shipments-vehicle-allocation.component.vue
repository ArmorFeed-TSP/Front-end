<template>
    <div class="container">
    <div class="flex flex-column space-between align-items-center">
      <div class="my-7 flex flex-column card" style="max-width: 40rem; width: 100%; margin: 0 auto; min-height: 90vh">
        <pv-data-table
          style="max-width: 90rem"
          ref="dt"
          :value="availableVehicles"
          v-model:selection="this.$dataTransfer.selectedVehicle"
          datakey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vehicles"
          responsiveLayout="scroll"
          selectionMode="single"
        >
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
          <pv-column
            field="vehicleType"
            header="Vehicle Type"
            :sortable="true"
            style="min-width: 16rem"
          ></pv-column>
          <pv-column
            field="currentState"
            header="Current State"
            :sortable="true"
            style="min-width: 16rem"
          ></pv-column>
          <pv-column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <pv-button
                icon="pi pi-check"
                class="p-button-text p-button-rounded"
                @click="editVehicle(slotProps.data)"
              />
            </template>
          </pv-column>
        </pv-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import { VehiclesApiService } from '../../../vehicles/services/vehicle-api.service';
export default {
    name: "enterprise-shipments-vehicle-allocation",
    data() {
        return {
            availableVehicles: [],
            selectedVehicle: null
        }
    },
    props: {
        enterpriseId: Number
    },
    created() {
        const vehicleApiService = new VehiclesApiService();
        vehicleApiService.getAllAvailablesByEnterpriseId(this.enterpriseId)
        .then(res => {
            this.availableVehicles = res.data;
        })
        .catch(reason => {
            this.$toast.add({ severity: 'error', summary: 'Service Error', detail: 'Something went wrong trying to fetch the data', life: 3000 });
        });
    },
    methods: {
        editVehicle(data) {
            console.log(this.$dataTransfer);
        }
    }
}
</script>

<style>

</style>