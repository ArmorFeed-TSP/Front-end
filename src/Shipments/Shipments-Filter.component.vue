<template>
<DropDown class="w-30rem text-center py-3 px-7 text-1xl mt-7" v-model="selectedItem" :options="options" optionLabel="name" @change="handleClick">
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
          code: 'Todo'
        },
        {
          name: 'Envíos pendientes',
          code: 'Pendiente'
        },
        {
          name: 'Envíos realizados',
          code: 'Finalizado'
        },
        {
          name: 'Envios en curso',
          code: 'En curso'
        }
      ],
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
