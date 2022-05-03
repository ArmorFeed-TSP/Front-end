<template>
<DropDown class="w-30rem text-center py-3 px-7 text-1xl mt-7" v-model="selectedItem" :options="options" optionLabel="name">
<template #option="slotProps">
  <div class="p-dropdown-car-option text-center py-3 px-7 text-1xl">
    <span>{{ slotProps.option.name }}</span>
  </div>
</template>
</DropDown>
</template>

<script>
export default {
  name: "ShipmentsFilter",
  data() {
    return {
      options: [
        {
          name: 'Todos los envíos',
          code: 'ALL'
        },
        {
          name: 'Envíos pendientes',
          code: 'PENDING'
        },
        {
          name: 'Envíos realizados',
          code: 'FINISHED'
        }
      ],
      selectedItem: null
    }
  },
  mounted() {
    this.selectedItem = this.options[0];
  }
}
</script>
