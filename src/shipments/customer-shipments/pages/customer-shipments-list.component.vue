<template>
  <div class="my-7 flex flex-column fz-12">
    <pv-data-table
      v-model:filters="filters"
      :value="currentCustomerShipments"
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
        :header="col.header"
        :field="col.field"
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
      <!--<pv-column field="id" header="Code">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Search by name - ${filterModel.matchMode}`"/>
        </template>
      </pv-column>-->
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <router-link
            :to="`/customers/${this.id}/shipments/${slotProps.data.id}/shipment-detail`"
            ><pv-button icon="pi pi-eye" class="p-button-text p-button-rounded"
          /></router-link>
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script>
import { CustomerShipmentsApiService } from "../services/customer-shipments-api.service.js";
import { FilterMatchMode } from "primevue/api";
import InputText from "primevue/inputtext";

export default {
  name: "customer-shipments-list",
  components: { InputText },
  data() {
    return {
      customerShipmentsApiService: null,
      customerShipments: [],
      currentCustomerShipments: [],
      filters: {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { value: null, matchMode: FilterMatchMode.EQUALS},
        'origin': { value: null, matchMode: FilterMatchMode.CONTAINS},
        'pickUpDate': { value: null, matchMode: FilterMatchMode.DATE_IS},
        'destiny': { value: null, matchMode: FilterMatchMode.CONTAINS},
        'deliveryDate': { value: null, matchMode: FilterMatchMode.CONTAINS},
        'status': { value: null, matchMode: FilterMatchMode.EQUALS}
      },
      columns: [
        { field: "id", header: "Code" },
        { field: "origin", header: "Origin" },
        { field: "pickUpDate", header: "Pick Up Date" },
        { field: "destiny", header: "Destiny" },
        { field: "deliveryDate", header: "Delivery Date" },
        { field: "status", header: "Status" },
      ],
      tableIsLoading: true,
      statuses: ["Pending", "In progress", "Finished"]
    };
  },
  created() {
    const statuses = ["Pending", "In progress", "Finished"];
    this.customerShipmentsApiService = new CustomerShipmentsApiService();
    this.customerShipmentsApiService
      .findByCustomerId(this.id)
      .then((response) => {
        this.customerShipments = response.data;
        this.currentCustomerShipments = response.data;
        this.$dataTransfer.clearShipmentsIds();
        this.customerShipments.forEach((shipment) => {
          this.$dataTransfer.addCustomerShipmentId(shipment.id);
        });
        this.customerShipments = this.customerShipments.map((shipment) => {
          const newShipment = { ...shipment };
          newShipment.status = statuses[newShipment.status];
          return newShipment;
        });
        this.currentCustomerShipments = this.customerShipments;
        console.log(this.customerShipments);
        console.log(this.$dataTransfer.shipmentsIds);
        console.log(this.id);

        this.tableIsLoading = false;
      });
  },
  methods: {
    filterContent(status) {
      if (status === "All") {
        this.currentCustomerShipments = this.customerShipments;
        return;
      }
      this.currentCustomerShipments = this.customerShipments.filter(
        (shipment) => {
          return shipment.status === status;
        }
      );
    },
    changeText() {
      console.log("cambio");
    }
  },
  props: {
    id: Number,
  },
};
</script>

<style scoped></style>
