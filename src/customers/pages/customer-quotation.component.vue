<template>
  <div class="bg-armor-feed">
    <div style="max-width: 45rem; width: 100%; margin: 0 auto">
      <pv-step :model="steps"></pv-step>
      <router-view
        :formData="formObject"
        @next-page="nextPage($event)"
        @prev-page="prevPage($event)"
        @complete="complete"
      ></router-view>
      <pv-toast></pv-toast>
    </div>
  </div>
</template>

<script>
import AddressesService from "../services/addresses.service";
import ShipmentsService from "../services/shipments.service";

export default {
  name: "customer-quotation",
  data() {
    return {
      steps: [
        {
          label: "",
          to: "/quotations",
        },
        {
          label: "",
          to: "/quotations/business-shipping",
        },
        {
          label: "",
          to: "/quotations/pick-up-detail",
        },
        {
          label: "",
          to: "/quotations/destination-detail",
        },
        {
          label: "",
          to: "/quotations/payment",
        },
      ],
      formObject: {},
      addressOriginId: null,
      departmentOrigin: null,
      addressDestinationId: null,
      departmentDestination: null,
      address: [],
      errors: [],
    };
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }
      localStorage.setItem("formObject", JSON.stringify(this.formObject));
      this.$router.push(this.steps[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.steps[event.pageIndex - 1].to);
    },
    async complete() {
      await this.saveAddress(this.formObject.origin);
      await this.saveAddress(this.formObject.destination);
      this.departmentOrigin = this.address[0].department;
      this.addressOriginId = this.address[0].id;
      this.departmentDestination = this.address[1].department;
      this.addressDestinationId = this.address[1].id;
      console.log(this.address);
      await this.createShipment();
    },
    async createShipment() {
      let shipment = {
        enterpriseId: this.formObject.enterpriseId,
        origin: this.departmentOrigin,
        addressOriginId: this.addressOriginId,
        destination: this.departmentDestination,
        addressDestinationId: this.addressDestinationId,
        pickUpDate: this.formObject.pickUpDate,
        deliveryDate: this.formObject.deliveryDate,
        amount: this.formObject.amount,
      };
      await ShipmentsService.create(shipment)
        .then((response) => {
          shipment = response.data;
          this.$toast.add({
            severity: "success",
            summary: "Order submitted",
            detail: "New shipping order was registered",
          });
          this.address.splice(0, 2);
          this.$router.push({ name: "customer-quotation" });
        })
        .catch((error) => {
          this.errors.push(error);
          console.log(error);
          this.$toast.add({
            severity: "error",
            summary: "Failed to register",
            detail: "Registration could not be completed",
          });
        });
    },
    async saveAddress(address) {
      await AddressesService.create(address)
        .then((response) => {
          this.address.push(response.data);
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
  },
};
</script>

<style scoped>
.bg-armor-feed {
  background-color: #e5eced;
}
</style>
