<template>
  <div class="flex justify-content-center bg-armor-feed">
    <div>
      <div class="p-card px-2 border-none shadow-none bg-armor-feed" style="max-width: 35rem; width: 100%">
        <pv-step :model="steps"></pv-step>
      </div>
      <router-view :formData="formObject" @next-page="nextPage($event)"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer-quotation",
  data() {
    return {
      steps: [
        {
          label: "",
          to: "/steps",
        },
        {
          label: "",
          to: "/steps/business-shipping",
        },
        {
          label: "",
          to: "/steps/pick-up-detail",
        },
        {
          label: "",
          to: "/steps/destination-detail",
        },
        {
          label: "",
          to: "/steps/payment",
        },
      ],
      formObject: {}
    };
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }
      this.$router.push(this.items[event.pageIndex + 1].to);
    },
  }
};
</script>

<style scoped>
.bg-armor-feed {
  background-color: #E5ECED;
}
</style>
