<template>
  <TabMenu :model="items" class="mt-6 mx-4"/>
</template>

<script>
export default {
  name: "Navigation",
  data(){
    return {
      activeTab: 0
    }
  },
  props: {
    items: Array,
    paramActiveTab: Number
  },
  mounted(){
    this.activeTab = this.paramActiveTab;
  }
}
</script>