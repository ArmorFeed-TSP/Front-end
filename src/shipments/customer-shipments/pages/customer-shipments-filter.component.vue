<template>
  <pv-drop-down class="w-30rem text-center py-3 px-4 text-1xl mt-7" v-model="selectedItem" :options="options" @change="handleClick">
    <template #option="slotProps">
      <div class="p-dropdown-car-option text-center py-3 px-7 text-1xl">
        <span>{{ slotProps.option}}</span>
      </div>
    </template>
  </pv-drop-down>
</template>

<script>
export default {
  name: "customer-shipments-filter",
  data() {
    return {
      options: ['All', 'Pending', 'Finished', 'In progress'],
      selectedItem: null
    }
  },
  mounted() {
    this.selectedItem = this.options[0];
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>
