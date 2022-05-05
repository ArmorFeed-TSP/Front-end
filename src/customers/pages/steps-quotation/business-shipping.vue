<template>
  <div class="flex justify-content-center">
    <pv-card
      class="card-quotation-size p-2 bg-armor-feed border-none shadow-none"
    >
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
          <div class="pb-2">
            <label class="font-bold" for="filter">Filters</label>
          </div>
          <div class="lg:flex justify-content-between">
            <pv-dropdown
              v-model="selectedFilter"
              :options="priceFilter"
              optionLabel="label"
              placeholder="Prices"
              class="w-full lg:mr-1 sm:mb-2 lg:mb-0"
              @change="onSortChange($event)"
            >
            </pv-dropdown>
            <pv-dropdown
              v-model="selectedFilter"
              :options="qualityFilter"
              optionLabel="label"
              placeholder="Quality service"
              class="w-full lg:ml-1 sm:mt-1 lg:mt-0"
              @change="onSortChange($event)"
            >
            </pv-dropdown>
          </div>
        </div>
        <div class="pb-4">
          <div class="pb-2">
            <label for="business" class="font-bold">Business</label>
          </div>
          <div>
            <pv-toast></pv-toast>
            <pv-data-table
              :value="businessShipment"
              :paginator="true"
              :rows="5"
              v-model:selection="selectedCompany"
              selectionMode="single"
              dataKey="id"
              @rowSelect="onRowSelect"
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
              <pv-column field="date" header="Date"></pv-column>
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
  name: "business-shipping",
  data() {
    return {
      selectedFilter: null,
      sortOrder: null,
      sortField: null,
      selectedCompany: null,
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
      businessShipment: [
        {
          id: 1,
          name: "Ups S.A.C",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/1200px-United_Parcel_Service_logo_2014.svg.png",
          date: "27 of december",
          price: 24.0,
          ratingService: 4.5,
        },
        {
          id: 2,
          name: "DHL Express Peru S.A.C",
          photo:
            "https://logos-world.net/wp-content/uploads/2020/08/DHL-Symbol.png",
          date: "27 of december",
          price: 23.9,
          ratingService: 3.8,
        },
        {
          id: 4,
          name: "Olva Courier S.A.C",
          photo:
            "https://play-lh.googleusercontent.com/MeXv_OgOVC6MRdlgC4SPjQWzsDvLr47N-28mwWvPnrXgI_tskMVA5lSxxFJ1BOIVeFha",
          date: "28 of december",
          price: 22.9,
          ratingService: 2.9,
        },
        {
          id: 5,
          name: "Urbano Peru S.A.C",
          photo:
            "https://play-lh.googleusercontent.com/yUS_LIjrQ5blHXmcwiMqGEXaJSArsTNMJ-U5531CGlObUCtzk4us-GGfYXN9lmQjRzY",
          date: "26 of december",
          price: 22.9,
          ratingService: 2.8,
        },
        {
          id: 6,
          name: "Ransa Peru S.A.C",
          photo: "https://www.practicas.pe/organizaciones/practicas-ransa.png",
          date: "28 of december",
          price: 20.9,
          ratingService: 2.8,
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
      this.$toast.add({severity: 'info', summary: 'Company Selected', detail: 'Name: ' + event.data.name, life: 3000});
    },
    onSortChange(event){
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.selectedFilter = sortValue;
      }
      else {
        this.sortOrder = 1;
        this.sortField = value;
        this.selectedFilterPrice = sortValue;
      }
    },
  },
};
</script>

<style scoped>
.bg-armor-feed {
  background-color: #e5eced;
}
.product-image {
  max-width: 24px;
  max-height: 24px;
  margin-right: 5px;
}
</style>
