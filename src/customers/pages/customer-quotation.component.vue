<template>
  <div class="bg-armor-feed">
    <div
      style="max-width: 45rem; width: 100%; margin: 0 auto; min-height: 90vh"
    >
      <pv-step :model="steps" :exact="false"></pv-step>
      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @next-page="nextPage($event)"
        @prev-page="prevPage($event)"
        @complete="complete"
      >
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </router-view>
      <pv-toast></pv-toast>
    </div>
  </div>
</template>

<script>
import AddressesService from "../services/addresses.service";
import ShipmentsService from "../services/shipments.service";
import PaymentsService from "../services/payments.service";

export default {
  name: "customer-quotation",
  data() {
    return {
      steps: [
        {
          label: "Quotation",
          to: "/quotations",
        },
        {
          label: "Enterprise",
          to: "business-shipping",
        },
        {
          label: "Pick Up",
          to: "pick-up-detail",
        },
        {
          label: "Destination",
          to: "destination-detail",
        },
        {
          label: "Payment",
          to: "payment",
        },
      ],
      formObject: {},
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
    async complete(event) {
      // Registered the last payment
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }
      // Registered the address origin in the persistence
      const originDetail = await this.createAddress(
        this.formObject.originDetail
      );
      // Registered the address destination in the persistence
      const destinationDetail = await this.createAddress(
        this.formObject.destinationDetail
      );
      // Registered the payment in the persistence
      const payment = await this.createPayment(this.formObject.payment);
      // Create the object shipment
      const shipment = this.createShipmentObject(
        originDetail,
        destinationDetail,
        payment
      );
      // Registered shipment in the persistence
      const shipmentRegistered = await this.createShipment(shipment);
      // Verification ok
      if (shipmentRegistered) {
        this.$toast.add({
          severity: "success",
          summary: "Order submitted",
          detail:
            "New shipping order was registered from " +
            this.formObject.origin +
            " to " +
            this.formObject.destination +
            "",
          life: 4000,
        });
        localStorage.removeItem("formObject");
        await this.$router.push({ path: "/quotations" });
        return;
      }
      // Verification error
      this.$toast.add({
        severity: "error",
        summary: "Failed to register",
        detail: "Registration could not be completed",
        life: 4000,
      });
    },
    async createShipment(shipment) {
      return await ShipmentsService.create(shipment)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    createShipmentObject(origin, destination, payment) {
      return {
        originId: origin.id,
        originDepartment: origin.department,
        destinationId: destination.id,
        destinationDepartment: destination.department,
        paymentId: payment.id,
        status: this.formObject.status,
        pickUpDate: this.formObject.pickUpDate,
        deliveryDate: this.formObject.deliveryDate,
      };
    },
    async createAddress(address) {
      return await AddressesService.create(address)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    async createPayment(payment) {
      return await PaymentsService.create(payment)
        .then((response) => {
          return response.data;
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
