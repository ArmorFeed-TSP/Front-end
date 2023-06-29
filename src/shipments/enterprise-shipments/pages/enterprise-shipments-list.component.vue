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
      <pv-column :exportable="false" style="min-width: 8rem" header="Status">
        <template #body="slotProps">
          <div v-if="slotProps.data.status === '0'">
            <p>Pending</p>
          </div>
          <div v-else-if="slotProps.data.status === '1'">
            <p>In progress</p>
          </div>
          <div v-else>
            <p>Finished</p>
          </div>
        </template>
      </pv-column>
      <pv-column :exportable="false" style="min-width: 8rem" header="Actions">
        <template #body="slotProps">
          <pv-button icon="pi pi-car" class="p-button-text p-button-rounded" />
          <!-- Admin control to reset status -->
          <!-- <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="editStatus(slotProps.data)" /> -->
          <router-link
              :to="`/enterprise/${this.id}/shipments/${slotProps.data.id}/shipment-detail`"
          ><pv-button icon="pi pi-eye" class="p-button-text p-button-rounded"
          /></router-link>
        </template>
      </pv-column>
      <pv-column :exportable="false" style="min-width: 8rem" header="Next phase">
        <template #body="slotProps">
          <div v-if="slotProps.data.status === '0'">
            <pv-button
                label="Start Delivery"
                icon="pi pi-play"
                class="p-button-text p-button-rounded"
                @click="startDelivery(slotProps.data)"
            />
          </div>
          <div v-else-if="slotProps.data.status === '1'">
            <pv-button
                label="Finish Shipment"
                icon="pi pi-check"
                class="p-button-text p-button-rounded"
                @click="finishShipment(slotProps.data)"
            />
          </div>
          <div v-else>
            --
          </div>
        </template>
      </pv-column>

    </pv-data-table>

    <!-- Update status dialog -->
    <pv-dialog
      v-model="displayDialog"
      :style="{ width: '450px' }"
      :closable="false"
      :dismissable-mask="false"
    >
      <template #header>
        <div class="p-d-flex p-ai-center">
          <i class="pi pi-exclamation-triangle p-mr-2" style="font-size: 2rem; color: var(--warning-color)"></i>
          <h4>Update Status</h4>
        </div>
      </template>
      <template #content>
        <div class="p-d-flex p-ai-center p-dir-col">
          <div>
            <p>Are you sure you want to update the status of the shipment to:</p>
            <p class="p-text-bold">{{ statusLabel }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-d-flex p-jc-between">
          <pv-button label="Cancel" @click="cancelStatusUpdate" />
          <pv-button label="Update" @click="confirmStatusUpdate" class="p-button-warning" />
        </div>
      </template>
    </pv-dialog>
  </div>
</template>
<script>
import { EnterpriseShipmentsService } from "../services/enterprise-shipments.service";
import { FilterMatchMode } from "primevue/api";
import EnterpriseShipmentsVehicleAllocationComponent from "./enterprise-shipments-vehicle-allocation.component.vue";
import { VehiclesApiService } from "@/vehicles/services/vehicle-api.service";
import { NotificationsApiService } from "@/notifications/service/notifications-api.service";

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
        { field: "status", header: "Status ID" },
      ],
      currentShipments: [],
      dialogEnabled: false,
      statusEnabled: false,
      confirmEnabled: false,

      startStatusEnabled: false,
      startConfirmEnabled: false,
      startSubmitted: false,

      finishStatusEnabled: false,
      finishConfirmEnabled: false,
      finishSubmitted: false,

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
      notificationService : new NotificationsApiService(),
    };
  },
  created() {
    this.enterpriseShipmentsService = new EnterpriseShipmentsService();
    this.notificationService = new NotificationsApiService();
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
        /*return this.shipment.status.value === 'In progress';*/
        return this.shipment.status && this.shipment.status.value === 'In progress';
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
    handleMissingVehicle() {
      this.$toast.add({
        severity: 'info',
        summary: 'Some data is missing',
        detail: 'You have to select an available vehicle',
        life: 3000
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

        if (this.$dataTransfer.selectedVehicle === null && this.shipment.status === 1) {
          this.handleMissingVehicle();
          return;
        }

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

    // my changes
    startDelivery(shipment) {
      this.shipment = {...shipment};
      this.startStatusEnabled = !this.startStatusEnabled;
    },
    finishShipment(shipment) {
      this.shipment = {...shipment};
      console.log(this.shipment);
      this.finishStatusEnabled = !this.finishStatusEnabled;
    },

    startHideConfirmDialog() {
      this.startConfirmEnabled = false;
    },
    finishHideConfirmDialog() {
      this.finishConfirmEnabled = false;
    },

    startHideStatusDialog() {
      this.startStatusEnabled = false;
      this.startSubmitted = false;
    },
    finishHideStatusDialog() {
      this.finishStatusEnabled = false;
      this.finishSubmitted = false;
    },
  },
};
</script>
