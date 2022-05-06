<template>
  <pv-card class="border-none shadow-none bg-transparent w-full">
    <template v-slot:title>
      <div class="text-center">Where do we send it?</div>
    </template>
    <template v-slot:subtitle>
      <div class="text-center">clearly details the address</div>
    </template>
    <template v-slot:content>
      <div class="p-fluid">
        <div class="field m-2 mb-4">
          <label class="font-bold" for="destination">Destination</label>
          <span class="p-input-icon-left">
            <i class="pi pi-map"></i>
            <pv-input-text
              class="p-disabled"
              v-model="dataObject.destinationDepartment"
              placeholder="City or Code Postal"
            ></pv-input-text>
          </span>
        </div>
        <div class="details">
          <div class="m-2">
            <label class="font-bold" for="details">Details</label>
          </div>
          <div class="field m-2">
            <label class="font-bold" for="type-address">Direction Type</label>
            <pv-dropdown
              id="type-address"
              :options="addressTypes"
              v-model="selectedTypeAddress"
              optionLabel="name"
              placeholder="Enter the address type"
            ></pv-dropdown>
          </div>
          <div class="field m-2">
            <label class="font-bold" for="address">Address</label>
            <pv-input-text
              id="address"
              v-model="destinationAddress.address"
            ></pv-input-text>
          </div>
          <div class="field m-2">
            <label class="font-bold" for="urbanization">Urbanization</label>
            <pv-input-text
              id="urbanization"
              v-model="destinationAddress.urbanization"
            ></pv-input-text>
          </div>
          <div class="field m-2">
            <label class="font-bold" for="reference">Reference</label>
            <pv-input-text
              id="reference"
              v-model="destinationAddress.reference"
            ></pv-input-text>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div style="width: 100%" class="flex justify-content-between">
        <pv-button
          class="p-button-success text-white w-full m-2"
          label="Come Back"
          icon="pi pi-angle-left"
          iconPos="left"
          @click="prevPage"
        ></pv-button>
        <pv-button
          class="p-button-info text-white w-full m-2"
          label="Continue"
          icon="pi pi-angle-right"
          iconPos="right"
          @click="nextPage"
        ></pv-button>
      </div>
    </template>
  </pv-card>
</template>

<script>
export default {
  name: "destination-detail",
  data: () => {
    return {
      selectedTypeAddress: null,
      validationErrors: {},
      dataObject: {},
      addressTypes: [
        { id: 1, name: "Department" },
        { id: 2, name: "House" },
        { id: 3, name: "Condominium" },
      ],
      destinationAddress: {
        department: null,
        typeAddress: null,
        address: null,
        urbanization: null,
        reference: null,
      },
    };
  },
  methods: {
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        this.createAddressDestination();
        this.$emit("next-page", {
          formData: {
            enterpriseId: this.dataObject.enterpriseId,
            deliveryDate: this.dataObject.deliveryDate,
            pickUpDate: this.dataObject.pickUpDate,
            origin: this.dataObject.origin,
            destination: this.destinationAddress,
            amount: this.dataObject.amount,
          },
          pageIndex: 3,
        });
      }
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 3 });
    },
    validateForm() {
      /*
      if (!this.origin.trim()) this.validationErrors["origin"] = true;
      else delete this.validationErrors["origin"];
      if (!this.destination.trim()) this.validationErrors["destination"] = true;
      else delete this.validationErrors["destination"];*/
      return !Object.keys(this.validationErrors).length;
    },
    createAddressDestination() {
      this.destinationAddress.typeAddress = this.selectedTypeAddress.name;
      this.destinationAddress.department =
        this.dataObject.destinationDepartment;
    },
  },
  mounted() {
    this.dataObject = JSON.parse(localStorage.getItem("formObject"));
  },
};
</script>

<style>
.card-quotation-size {
  width: 100%;
}
.bg-armor-feed {
  background-color: #e5eced;
}
</style>
