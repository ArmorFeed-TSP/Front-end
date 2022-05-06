<template>
  <pv-card class="border-none shadow-none bg-transparent">
    <template v-slot:title>
      <div class="text-center">Where do we pick it up?</div>
    </template>
    <template v-slot:subtitle>
      <div class="text-center">clearly details the address</div>
    </template>
    <template v-slot:content>
      <div class="p-fluid">
        <div class="field m-2 mb-4">
          <label for="origin" class="font-bold">Origin</label>
          <span class="p-input-icon-left">
            <i class="pi pi-map"></i>
            <pv-input-text
              class="p-disabled"
              v-model="origin"
              placeholder="City or Code Postal"
            ></pv-input-text>
          </span>
        </div>
        <div class="details">
          <div class="m-2">
            <label for="details" class="font-bold">Details</label>
          </div>
          <div class="field m-2">
            <label for="type-address" class="font-bold">Address type</label>
            <pv-dropdown
              id="type-address"
              v-model="selectedAddressType"
              :options="addressTypes"
              optionLabel="name"
              placeholder="Enter the address type"
            ></pv-dropdown>
          </div>
          <div class="field m-2">
            <label for="address" class="font-bold">Address</label>
            <pv-input-text id="address"></pv-input-text>
          </div>
          <div class="field m-2">
            <label for="urbanization" class="font-bold">Urbanization</label>
            <pv-input-text id="urbanization"></pv-input-text>
          </div>
          <div class="field m-2">
            <label for="reference" class="font-bold">Reference</label>
            <pv-input-text id="reference"></pv-input-text>
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
  name: "pick-up-detail",
  data: () => {
    return {
      validationErrors: {},
      selectedAddressType: null,
      addressTypes: [
        { id: 1, name: "Department"},
        { id: 2, name: "House" },
        { id: 3, name: "Condominium"},
      ],
    };
  },
  methods: {
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        this.$emit("next-page", {
          formData: {},
          pageIndex: 2,
        });
      }
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 2 });
    },
    validateForm() {
      /*
      if (!this.origin.trim()) this.validationErrors["origin"] = true;
      else delete this.validationErrors["origin"];
      if (!this.destination.trim()) this.validationErrors["destination"] = true;
      else delete this.validationErrors["destination"];*/
      return !Object.keys(this.validationErrors).length;
    },
  }
};
</script>

<style></style>
