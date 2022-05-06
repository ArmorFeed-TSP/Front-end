<template>
  <div class="bg-armor-feed">
    <div style="max-width: 45rem; width: 100%; margin: 0 auto">
      <pv-step :model="steps"></pv-step>
      <router-view :formData="formObject" @next-page="nextPage($event)" @prev-page="prevPage($event)"></router-view>
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
      this.$router.push(this.steps[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.steps[event.pageIndex - 1].to);
    },
  }
};
</script>

<style scoped>
.bg-armor-feed {
  background-color: #E5ECED;
}
</style>
