<template>
  <pv-card class="border-none shadow-none bg-transparent w-full">
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
        <template v-if="creditCardNumber === null" v-slot:subtitle> **** **** **** **** **** </template>
        <template v-else v-slot:subtitle>{{creditCardNumber}}</template>
        <template v-slot:content>
          <div class="flex h-auto">
            <span v-if="creditCardExpiration === null">MM/AA</span>
            <span v-else>{{creditCardExpiration}}</span>
          </div>
          <div>
            <span v-if="creditCardOwner === null" class="uppercase">FullName</span>
            <span v-else class="uppercase">{{creditCardOwner}}</span>
          </div>
        </template>
      </pv-card>
      <div class="p-fluid">
        <div class="field m-2">
          <pv-input-text v-model="creditCardOwner" placeholder="Name of owner" class="uppercase"></pv-input-text>
        </div>
        <div class="field m-2">
          <pv-input-mask v-model="creditCardNumber" placeholder="Credit Card Number" class="uppercase" mask="9999 9999 9999 9999"></pv-input-mask>
        </div>
        <div class="field flex">
          <pv-input-number
            class="m-2"
            mode="decimal"
            :min="100"
            :max="999"
            v-model="creditCardCvv"
            placeholder="CCV"
          ></pv-input-number>
          <pv-input-mask
            class="uppercase m-2"
            mask="99/99"
            v-model="creditCardExpiration"
            placeholder="Mm/aa"
          ></pv-input-mask>
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
          @click="prevPage"
        ></pv-button>
        <pv-button
          class="p-button-info text-white w-full ml-1"
          label="Solicit"
          icon="pi pi-angle-right"
          iconPos="right"
          @click="complete"
        ></pv-button>
      </div>
    </template>
  </pv-card>
</template>

<script>
export default {
  name: "payment-shipment",
  data: () => {
    return {
      validationErrors: {},
      creditCardOwner: null,
      creditCardNumber: null,
      creditCardCvv: null,
      creditCardExpiration: null,
      payment: {},
      dataObject: {},
    };
  },
  methods: {
    complete() {
      this.$emit('complete');
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 4 });
    },
    validateForm() {
      /*
      if (!this.origin.trim()) this.validationErrors["origin"] = true;
      else delete this.validationErrors["origin"];
      if (!this.destination.trim()) this.validationErrors["destination"] = true;
      else delete this.validationErrors["destination"];*/
      return !Object.keys(this.validationErrors).length;
    },
  },
  mounted() {
    this.dataObject = JSON.parse(localStorage.getItem("formObject"));
  }
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
