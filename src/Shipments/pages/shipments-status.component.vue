<template>
 <pv-drop-down class="w-30rem text-center" v-model="selectedItem" :options="options" @change="handleClick">
   <template #option="slotProps">
     <div class="p-dropdown-car-option text-center">
       <span>{{ slotProps.option }}</span>
     </div>
   </template>
 </pv-drop-down>
</template>

<script>
export default {
  name: "shipments-status",
  data() {
    return {
      options: ['Pending', 'Finished', 'In progress'],
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