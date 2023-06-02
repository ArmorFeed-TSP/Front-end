<template>
  <pv-toast/>
  <div class="my-7 flex flex-column">
    <pv-data-table
      v-model:filters="filters"
      :value="currentShipments"
      responsiveLayout="stack"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :loading="tableIsLoading"
      filterDisplay="menu"
    >
      <template #empty>No shipments found</template>
      <template #loading>Loading customer shipments. Please wait</template>
      <pv-column
        v-for="col in columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      >
        <template #filter="{ filterModel, filterCallback }">
          <pv-dropdown
            v-if="col.field === 'status'"
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="statuses"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          ></pv-dropdown>
          <pv-input-text
            v-else
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            :placeholder="`Search by name - ${filterModel.matchMode}`"
          ></pv-input-text>
        </template>
      </pv-column>
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button icon="pi pi-car" class="p-button-text p-button-rounded" />
          <pv-button
            icon="pi pi-pencil"
            class="p-button-text p-button-rounded"
            @click="editStatus(slotProps.data)"
          />
          <router-link
            :to="`/enterprise/${this.id}/shipments/${slotProps.data.id}/shipment-detail`"
            ><pv-button icon="pi pi-eye" class="p-button-text p-button-rounded"
          /></router-link>
        </template>
      </pv-column>
    </pv-data-table>
    <pv-dialog v-model:visible="statusEnabled">
      <template #header>
        <h3>Change actual state</h3>
      </template>
      <template #footer>
        <pv-button label="Submit" autofocus @click="showStatus" />
      </template>
    </pv-dialog>
    <pv-dialog
      v-model:visible="statusEnabled"
      :style="{ widht: '450px' }"
      header="Status information"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <pv-dropdown
          id="status"
          v-model="shipment.status"
          :options="statusses"
          optionLabel="label"
          placeholder="Select a new status"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'shipment-badge status-' + slotProps.value.value">{{
                slotProps.value.label
              }}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span
                :class="
                  'shipment-badge status-' + slotProps.value
                "
                >{{ slotProps.value }}</span
              >
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
        </pv-dropdown>
      </div>
      <EnterpriseShipmentsVehicleAllocationComponent 
        v-if="selectAvailableVehicle"
        :enterpriseId="this.id"
      ></EnterpriseShipmentsVehicleAllocationComponent>
      <template #footer>
        <pv-button
          :label="'Cancel'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideStatusDialog"
        />
        <pv-button
          :label="'Save'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveShipment"
        />
      </template>
    </pv-dialog>
    <pv-dialog v-model:visible="dialogEnabled">
      <template #header>
        <h3>Current Location</h3>
      </template>
      <img
        src="https://www.esedeerre.com/wp-content/uploads/2012/06/geolocalizacion-google-maps.jpg"
      />
      <template #footer>
        <pv-button label="Ok" autofocus @click="showDialog" />
      </template>
    </pv-dialog>
      <pv-dialog v-model:visible="confirmEnabled">
          <template #header>
              <h3>Confirm Status Change</h3>
          </template>
          <template #footer>
              <pv-button
                      :label="'Cancel'.toUpperCase()"
                      icon="pi pi-times"
                      class="p-button-text"
                      @click="hideConfirmDialog"
              />
              <pv-button
                      :label="'Save'.toUpperCase()"
                      icon="pi pi-check"
                      class="p-button-text"
                      @click="saveShipment"
              />
          </template>
          <div>Are you sure you want to change the shipment status to "{{ shipment.status }}"?</div>
      </pv-dialog>
  </div>
</template>

<script>
import { EnterpriseShipmentsService } from "../services/enterprise-shipments.service";
import { FilterMatchMode } from "primevue/api";
import EnterpriseShipmentsVehicleAllocationComponent from "./enterprise-shipments-vehicle-allocation.component.vue";
import { VehiclesApiService } from "../../../vehicles/services/vehicle-api.service";
import { NotificationsApiService } from "../../../notifications/service/notifications-api.service";

export default {
  name: "enterprise-shipments-list",
  components: {
    EnterpriseShipmentsVehicleAllocationComponent
  },
  data() {
    return {
      enterpriseShipmentsService: null,
      shipments: [],
      columns: [
        { field: "id", header: "Code" },
        { field: "origin", header: "Origin" },
        { field: "pickUpDate", header: "Pick Up Date" },
        { field: "destiny", header: "Destiny" },
        { field: "deliveryDate", header: "Delivery Date" },
        { field: "status", header: "Status" },
      ],
      currentShipments: [],
      dialogEnabled: false,
      statusEnabled: false,
      confirmEnabled: false,
      statusses: [
        { label: "Pending", value: "Pending" },
        { label: "Finished", value: "Finished" },
        { label: "In progress", value: "In progress" },
      ],
      selectedStatus: null,
      shipment: {},
      submitted: false,
      tableIsLoading: true,
      statuses: ["Pending", "In progress", "Finished"],
      filters: {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { value: null, matchMode: FilterMatchMode.EQUALS},
        'origin': { value: null, matchMode: FilterMatchMode.CONTAINS},
        'pickUpDate': { value: null, matchMode: FilterMatchMode.DATE_IS},
        'destiny': { value: null, matchMode: FilterMatchMode.CONTAINS},
        'deliveryDate': { value: null, matchMode: FilterMatchMode.CONTAINS},
        'status': { value: null, matchMode: FilterMatchMode.EQUALS}
      },
      notificationService : new NotificationsApiService()
    };
  },
  created() {
    this.enterpriseShipmentsService = new EnterpriseShipmentsService();
    this.enterpriseShipmentsService.getShipmentsById(this.id).then((response) => {
        this.shipments = structuredClone(response.data);
        this.currentShipments = structuredClone(response.data);
        this.shipments.forEach( shipment => {
          this.$dataTransfer.addEnterpriseShipmentId(shipment.id);
        });
        this.tableIsLoading = false;
      });
  },
  props: {
    id: Number
  },
  computed: {
    selectAvailableVehicle: {
      get() {
        return this.shipment.status.value === 'In progress';
      }
    }
  },
  methods: {
    filterContent(status) {
      if (status === "All") {
        this.currentShipments = this.shipments;
        return;
      }
      this.currentShipments = this.shipments.filter((shipment) => {
        return shipment.status === status;
      });
    },
    showDialog() {
      this.dialogEnabled = !this.dialogEnabled;
    },
    showStatus() {
      this.statusEnabled = !this.statusEnabled;
    },
    hideStatusDialog() {
      this.statusEnabled = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.shipments.findIndex((shipment) => shipment.id === id);
    },
    updateVehicle() {
      // Change vehicle current status to occupied
      this.$dataTransfer.selectedVehicle.currentState = "OCCUPIED";
        const vehiclesApiService = new VehiclesApiService();
        console.log(this.$dataTransfer.selectedVehicle);
        vehiclesApiService.update(this.$dataTransfer.selectedVehicle.id, this.$dataTransfer.selectedVehicle)
          .then(res => {
            this.$toast.add({ severity: 'success', summary: 'Success', detail: 'The vehicle was successfully linked to the shipment', life: 3000 });
            this.$dataTransfer.selectedVehicle = null;
          })
          .catch(reason => {
            this.$toast.add({ severity: 'error', summary: 'Service Error', detail: 'Something went wrong trying to put the data', life: 3000 });
            this.$dataTransfer.selectedVehicle = null;
          });
    },
    saveShipment() {
      this.submitted = true;
      const d = new Map();
      d.set("Pending", 0);
      d.set("In progress", 1);
      d.set("Finished", 2);
      if (this.shipment.id) {
        //this.shipment = this.getStorableShipment(this.shipment);
        this.shipment.status = this.shipment.status.value
          ? this.shipment.status.value
          : this.shipment.status;
        this.shipment.status = d.get(this.shipment.status);
        console.log(this.$dataTransfer.selectedVehicle);
        if(this.$dataTransfer.selectedVehicle === null && this.shipment.status === 1) {
          this.$toast.add({ severity: 'info', summary: 'Some data is missing', detail: 'You have to select an available vehicle', life: 3000 })
          return;
        };

        if(this.shipment.status === 1) {
          this.updateVehicle();
        }
        this.enterpriseShipmentsService.updateShipment(this.shipment.id, this.shipment).then((response) => {
            this.shipments[this.findIndexById(response.data.id)] = this.shipment;
            this.notificationService.create({
              title: "Shipment status was updated",
              description: `Shipment, with code ${response.data.id}, status was updated. Check it now`,
              sender: "ENTERPRISE",
              enterpriseId: response.data.enterpriseId,
              customerId: response.data.customerId
            }).then( response => {
              console.log(response);
            }).catch( error => {
              console.log(error);
            });
        });
      }
      this.statusEnabled = false;
      this.shipment = {};
      window.location.reload();
      this.confirmEnabled = true;
    },
    editStatus(shipment) {
      this.shipment = {...shipment};
      console.log(this.shipment);
      this.statusEnabled = !this.statusEnabled;
    },
    hideConfirmDialog() {
      this.confirmEnabled = false;
    },
  },
};
</script>
