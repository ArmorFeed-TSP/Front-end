<template>
  <div class="flex justify-content-center">
    <pv-card
      class="card-quotation-size p-2 bg-armor-feed border-none shadow-none"
    >
      <template v-slot:title>
        <div class="text-center">Where do we send it?</div>
      </template>
      <template v-slot:subtitle>
        <div class="text-center">details the address</div>
      </template>
      <template v-slot:content>
        <pv-card class="mx-2 my-4">
          <template v-slot:title>
            <span class="pi pi-credit-card"></span>
          </template>
          <template v-slot:subtitle>
            **** **** **** **** ****
          </template>
          <template v-slot:content>
            <div class="flex h-auto">
              <span>MM</span>
              <span>/</span>
              <span>AA</span>
            </div>
            <div>
              <span class="uppercase">FullName</span>
            </div>
          </template>
        </pv-card>
        <div class="p-fluid">
          <div class="field m-2">
            <pv-input-text placeholder="Name of owner"></pv-input-text>
          </div>
          <div class="field m-2">
            <pv-input-text placeholder="Credit Card Number"></pv-input-text>
          </div>
          <div class="field flex">
            <pv-input-text class="uppercase m-2" placeholder="Ccv"></pv-input-text>
            <pv-input-text class="uppercase m-2" placeholder="Mm/aa"></pv-input-text>
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
  name: "payment-shipment",
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
