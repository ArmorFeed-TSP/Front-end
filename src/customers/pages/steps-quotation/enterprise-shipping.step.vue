<template>
  <div class="flex justify-content-center">
    <pv-card class="border-none shadow-none bg-transparent w-full">
      <template v-slot:title>
        <div class="text-center">Select a company</div>
      </template>
      <template v-slot:subtitle>
        <div class="text-center">
          depending on the quality of service or shipping costs
        </div>
      </template>
      <template v-slot:content>
        <div class="pb-4">
          <div class="m-2">
            <label class="font-bold" for="filter">Filters</label>
          </div>
          <div class="p-fluid md:flex justify-content-between">
            <pv-dropdown
              v-model="selectedFilter"
              :options="priceFilter"
              optionLabel="label"
              placeholder="Prices"
              class="md:w-full m-2"
              @change="onSortChange($event)"
            >
            </pv-dropdown>
            <pv-dropdown
              v-model="selectedFilter"
              :options="qualityFilter"
              optionLabel="label"
              placeholder="Quality service"
              class="md:w-full m-2"
              @change="onSortChange($event)"
            >
            </pv-dropdown>
          </div>
        </div>
        <div class="pb-4">
          <div class="m-2">
            <label for="business" class="font-bold">Business</label>
          </div>
          <div>
            <pv-data-table
              :value="enterprises"
              :paginator="true"
              :rows="5"
              class="m-2 border-round"
              v-model:selection="selectedCompany"
              selectionMode="single"
              dataKey="id"
              @rowSelect="onRowSelect"
              @rowUnselect="onRowUnselect"
              responsiveLayout="scroll"
              :sortOrder="sortOrder"
              :sortField="sortField"
            >
              <pv-column field="name" header="Company">
                <template #body="slotProps">
                  <div
                    class="inline-flex justify-content-center align-items-center"
                  >
                    <img
                      :src="slotProps.data.photo"
                      :alt="slotProps.data.image"
                      class="product-image"
                    />
                    <p>{{ slotProps.data.name }}</p>
                  </div>
                </template>
              </pv-column>
              <pv-column field="dateShipmentShow" header="Date"></pv-column>
              <pv-column field="price" header="Price">
                <template #body="slotProps">
                  {{ formatCurrency(slotProps.data.price) }}
                </template>
              </pv-column>
              <pv-column field="ratingService" header="Rating Service">
                <template #body="slotProps">
                  <pv-rating
                    :modelValue="slotProps.data.ratingService"
                    :readonly="true"
                    :cancel="false"
                  ></pv-rating>
                </template>
              </pv-column>
            </pv-data-table>
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
  </div>
</template>

<script>
import EnterpriseService from "../../services/enterprise.service";

export default {
  name: "business-shipping",
  data() {
    return {
      quantity: null,
      weight: null,
      selectedFilter: null,
      sortOrder: null,
      sortField: null,
      selectedCompany: null,
      validationErrors: {},
      enterprises: [],
      errors: [],
      months: [
        "January",
        "February",
        "March",
        "April",
        "April",
        "April",
        "April",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      priceFilter: [
        {
          label: "High prices",
          code: "HP",
          value: "!price",
        },
        {
          label: "Low prices",
          code: "LP",
          value: "price",
        },
      ],
      qualityFilter: [
        {
          label: "High quality service",
          code: "HQ",
          value: "!ratingService",
        },
        {
          label: "Low quality service",
          code: "LQ",
          value: "ratingService",
        },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    onRowSelect(event) {
      this.$toast.add({
        severity: "info",
        summary: "Company Selected",
        detail: "Name: " + event.data.name,
        life: 3000,
      });
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.selectedFilter = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.selectedFilter = sortValue;
      }
    },
    onRowUnselect(event) {
      this.$toast.add({
        severity: "warn",
        summary: "Company Unselected",
        detail: "Name: " + event.data.name,
        life: 3000,
      });
    },
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        let formData = JSON.parse(localStorage.getItem("formObject"));
        this.$emit("next-page", {
          formData: {
            origin: formData.origin,
            destination: formData.destination,
            enterpriseId: this.selectedCompany.id,
            deliveryDate: this.selectedCompany.dateShipment,
            amount: this.selectedCompany.price,
            status: "pending",
          },
          pageIndex: 1,
        });
      }
    },
    prevPage() {
      this.$emit("prev-page", { pageIndex: 1 });
    },
    validateForm() {
      /*
      if (!this.origin.trim()) this.validationErrors["origin"] = true;
      else delete this.validationErrors["origin"];
      if (!this.destination.trim()) this.validationErrors["destination"] = true;
      else delete this.validationErrors["destination"];*/
      return !Object.keys(this.validationErrors).length;
    },
    async getAllEnterprises() {
      await EnterpriseService.getAll()
        .then((response) => {
          response.data.forEach((enterprise) => {
            enterprise.price = this.getPrice(enterprise);
            enterprise.dateShipment = this.getDateShipment(enterprise);
            enterprise.dateShipmentShow = this.getDateShipmentInFormat(
              enterprise.dateShipment
            );
          });
          this.enterprises = response.data;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    getPrice(enterprise) {
      let price =
        this.quantity *
        (enterprise.priceBase + enterprise.factorWeight * this.weight);
      return Number(price.toFixed(2));
    },
    getDateShipment(enterprise) {
      let today = new Date();
      today.setSeconds(enterprise.shippingTime * 3600);
      return (
        today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate()
      );
    },
    getDateShipmentInFormat(date) {
      let newDate = new Date(date);
      return newDate.getDate() + " of " + this.months[newDate.getMonth()];
    },
  },
  mounted() {
    let formObject = JSON.parse(localStorage.getItem("formObject"));
    this.weight = formObject.weight;
    this.quantity = formObject.quantity;
    this.getAllEnterprises();
  },
};
</script>

<style scoped>
.product-image {
  max-width: 24px;
  max-height: 24px;
  margin-right: 5px;
}
</style>
