<template>
  <div class="container">
    <div class="container__item">
      <ShipmentsFilter></ShipmentsFilter>
    </div>
  </div>
</template>

<script>
import ShipmentsFilter from "./Shipments-Filter.component.vue";

export default {
  name: "ShipmentsLayout",
  components: {
    ShipmentsFilter
  }
}
</script>