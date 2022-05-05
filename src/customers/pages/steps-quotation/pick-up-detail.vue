<template>
  <div class="flex justify-content-center">
    <pv-card
      class="card-quotation-size p-2 bg-armor-feed border-none shadow-none"
    >
      <template v-slot:title>
        <div class="text-center">Where do we pick it up?</div>
      </template>
      <template v-slot:subtitle>
        <div class="text-center">clearly details the address</div>
      </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="origin">Origin</label>
            <span class="p-input-icon-left">
              <i class="pi pi-map"></i>
              <pv-input-text
                id="origin"
                class="p-disabled"
                v-model="origin"
                placeholder="City or Code Postal"
              ></pv-input-text>
            </span>
          </div>
          <div class="details">
            <label for="details">Details</label>
            <div class="field">
              <label for="type-address">Direction Type</label>
              <pv-dropdown
                id="type-address"
                placeholder="Enter the address type"
              ></pv-dropdown>
            </div>
            <div class="field">
              <label for="address">Address</label>
              <pv-input-text id="address"></pv-input-text>
            </div>
            <div class="field">
              <label for="urbanization">Urbanization</label>
              <pv-input-text id="urbanization"></pv-input-text>
            </div>
            <div class="field">
              <label for="reference">Reference</label>
              <pv-input-text id="reference"></pv-input-text>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div style="width: 100%" class="flex justify-content-between">
          <pv-button
            class="p-button-success text-white w-full mr-1"
            label="Come Back"
            icon="pi pi-angle-left"
            iconPos="left"
          ></pv-button>
          <pv-button
            class="p-button-info text-white w-full ml-1"
            label="Continue"
            icon="pi pi-angle-right"
            iconPos="right"
          ></pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script>
export default {
  name: "pick-up-detail",
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
