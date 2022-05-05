<template>
  <div class="flex justify-content-center">
    <pv-card
      class="card-quotation-size p-2 bg-armor-feed border-none shadow-none"
    >
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
          <div class="field">
            <label for="origin">Origin</label>
            <span class="p-input-icon-left">
              <i class="pi pi-map"></i>
              <pv-input-text
                id="origin"
                v-model="origin"
                placeholder="City or Code Postal"
              ></pv-input-text>
            </span>
            <small
                v-show="validationErrors.origin && submitted"
                class="p-error"
            >Origin is required.</small>
          </div>
          <div class="field">
            <label for="destination">Destination</label>
            <span class="p-input-icon-left">
              <i class="pi pi-map"></i>
              <pv-input-text
                id="destination"
                v-model="destination"
                placeholder="City or Code Postal"
              ></pv-input-text>
            </span>
            <small
              v-show="validationErrors.destination && submitted"
              class="p-error"
              >Destination is required.</small
            >
          </div>
          <div class="content-section">
            <div v-for="(parcel, index) in parcels" v-bind:key="index">
              <div class="py-2">
                <label class="font-bold"
                  >Shipping content (#{{ index + 1 }})</label
                >
              </div>
              <div>
                <div class="field">
                  <label for="content">Content</label>
                  <pv-input-text
                    id="content"
                    v-model="parcel.content"
                  ></pv-input-text>
                </div>
                <div class="field">
                  <label for="value">Price</label>
                  <div class="grid align-items-center text-center">
                    <div class="col-10">
                      <pv-input-number
                        id="value"
                        v-model="parcel.price"
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                      ></pv-input-number>
                    </div>
                    <div class="col-2"><label for="value">PEN</label></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-auto">
              <pv-button
                class="p-button-secondary text-white w-auto"
                @click="addParcel"
                >Add another package</pv-button
              >
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
  </div>
</template>

<script>
export default {
  name: "step-quotation",
  data() {
    return {
      parcels: [
        {
          content: "",
          price: 0,
        },
      ],
      origin: "",
      destination: "",
      submitted: false,
      validationErrors: {},
    };
  },
  methods: {
    addParcel() {
      let parcel = {
        content: "",
        price: 0,
      };
      this.parcels.push(parcel);
    },
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
      if (!this.origin.trim()) this.validationErrors["origin"] = true;
      else delete this.validationErrors["origin"];
      if (!this.destination.trim()) this.validationErrors["destination"] = true;
      else delete this.validationErrors["destination"];
      return !Object.keys(this.validationErrors).length;
    },
  },
};
</script>

<style scoped>
.card-quotation-size {
  width: 100%;
}
.bg-armor-feed {
  background-color: #e5eced;
}
</style>
