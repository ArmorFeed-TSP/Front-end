<template>
  <pv-dialog
    v-model:visible="enabled"
    :style="{ width: '450px' }"
    header="New Vehicle"
    :modal="true"
    class="p-fluid"
  >
    <div v-for="field in fields" class="field">
      <label>{{ field.label }}</label>
      <div v-if="field.type === 1" class="field">
        <pv-input-text
          v-model.trim="vehicle[field.name]"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !vehicle[field.name] }"
        />
        <small class="p-error" v-if="submitted && !vehicle[field.name]"
          >{{ field.label }} is required</small
        >
      </div>
      <div v-else-if="field.type === 2">
        <pv-calendar v-model="vehicle[field.name]" dateFormat="dd/mm/yy" />
      </div>
      <div v-else>
        <p>Pending</p>
      </div>
    </div>
    <template #footer>
      <pv-button label="Submit" autofocus @click="handleSubmit" />
    </template>
  </pv-dialog>
</template>

<script>
import { VehiclesApiService } from "../service/Vehicles-api.service";

export default {
  name: "vehicles-form",
  data() {
    return {
      enabled: false,
      vehicle: {status:" "},
      submitted: true,
      fields: [
        { name: "id", label: "Id", type: 1 },
        { name: "brand", label: "Brand", type: 1 },
        { name: "licensePlate", label: "License Plate", type: 1 },
        { name: "year", label: "Year", type: 1 },
        { name: "model", label: "Model", type: 1 },
        { name: "maintenanceDate", label: "Maintenance Date", type: 2 },
      ],
      vehiclesService: new VehiclesApiService(),
    };
  },
  computed: {
    isValid: function () {
      let band = true;
      this.fields.forEach((field) => {
        if (!this.vehicle[field.name]) band = false;
      });
      return band;
    },
  },
  methods: {
    handleSubmit() {
      if (this.vehicle["pickUpDate"])
        this.vehicle["pickUpDate"] =
          this.vehicle["pickUpDate"].toLocaleString("en-GB");
      if (this.vehicle["deliveryDate"])
        this.vehicle["deliveryDate"] =
          this.vehicle["deliveryDate"].toLocaleString("en-GB");
      this.$emit("submit");
    },
  },
};
</script>
