<template>
  <pv-tab-menu :model="items"/>
</template>

<script>
export default {
  name: "navigation",
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