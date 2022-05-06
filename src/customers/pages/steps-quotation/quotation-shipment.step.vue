<template>
  <pv-card class="border-none shadow-none bg-transparent">
    <template v-slot:title>
      <div class="text-center">Quote your shipment</div>
    </template>
    <template v-slot:subtitle>
      <div class="text-center">
        Among the thousands of companies on the platform
      </div>
    </template>
    <template v-slot:content>
      <div class="p-fluid">
        <div class="field m-2">
          <label for="origin" class="font-bold">Origin</label>
          <pv-dropdown
            v-model="selectedDepartmentOrigin"
            :options="departments"
            optionLabel="name"
            id="origin"
            placeholder="Select the department origin"
          >
          </pv-dropdown>
          <small v-show="validationErrors.origin && submitted" class="p-error"
            >Origin is required.</small
          >
        </div>
        <div class="field m-2">
          <label for="destination" class="font-bold">Destination</label>
          <pv-dropdown
            id="destination"
            :options="departments"
            optionLabel="name"
            v-model="selectedDepartmentDestination"
            placeholder="Select the department destination"
          >
          </pv-dropdown>
          <small
            v-show="validationErrors.destination && submitted"
            class="p-error"
            >Destination is required.</small
          >
        </div>
        <div class="md:flex">
          <div class="field m-2 md:w-full">
            <label for="quantity" class="font-bold">Quantity (Units)</label>
            <pv-input-number
              id="quantity"
              v-model="valueQuantity"
              mode="decimal"
              showButtons
              :min="1"
              :max="100"
            ></pv-input-number>
          </div>
          <div class="field m-2 md:w-full">
            <label for="weight" class="font-bold">Weight</label>
            <pv-input-number
              id="weight"
              v-model="valueWeight"
              :min="0.01"
              :max="1000.0"
              suffix=" kg"
              :minFractionDigits="2"
              :maxFractionDigits="2"
            ></pv-input-number>
          </div>
        </div>
        <div class="md:flex">
          <div class="field m-2">
            <label for="large" class="font-bold">Large</label>
            <pv-input-number
              :min="0.01"
              :max="2100"
              id="large"
              suffix=" cm"
              v-model="valueLarge"
            >
            </pv-input-number>
          </div>
          <div class="field m-2">
            <label for="witch" class="font-bold">Witch</label>
            <pv-input-number
              :min="0.01"
              :max="2100"
              id="witch"
              suffix=" cm"
              v-model="valueWeight"
            >
            </pv-input-number>
          </div>
          <div class="field m-2">
            <label for="height" class="font-bold">Height</label>
            <pv-input-number
              :min="0.01"
              :max="2100"
              id="height"
              suffix=" cm"
              v-model="valueHeight"
            ></pv-input-number>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div style="width: 100%">
        <pv-button
          class="p-button-info text-white"
          label="Quotation"
          icon="pi pi-angle-right"
          iconPos="right"
          style="width: 100%"
          @click="nextPage"
        />
      </div>
    </template>
  </pv-card>
</template>

<script>
export default {
  name: "step-quotation",
  data() {
    return {
      selectedDepartmentOrigin: null,
      selectedDepartmentDestination: null,
      departments: [
        { name: "Amazonas" },
        { name: "Ancash" },
        { name: "Apurimac" },
        { name: "Arequipa" },
        { name: "Ayacucho" },
        { name: "Cajamarca" },
        { name: "Callao" },
        { name: "Cusco" },
        { name: "Huancavelica" },
        { name: "Huanuco" },
        { name: "Ica" },
        { name: "Junín" },
        { name: "La Libertad" },
        { name: "Lambayeque" },
        { name: "Lima" },
        { name: "Loreto" },
        { name: "Madre de Dios" },
        { name: "Moquegua" },
        { name: "Pasco" },
        { name: "Piura" },
        { name: "Puno" },
        { name: "San Martín" },
        { name: "Tacna" },
        { name: "Tumbes" },
        { name: "Ucayali" },
      ],
      submitted: false,
      valueQuantity: 1,
      valueWeight: 0.01,
      valueLarge: 0.01,
      valueWitch: 0.01,
      valueHeight: 0.01,
      validationErrors: {},
    };
  },
  methods: {
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        this.$emit("next-page", {
          formData: { origin: this.origin, destination: this.destination },
          pageIndex: 0,
        });
      }
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
};
</script>

<style scoped></style>
