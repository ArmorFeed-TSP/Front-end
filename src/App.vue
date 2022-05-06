<script setup>
import navigation from './shared/navigation/navigation.component.vue';

const items = [
  {label: 'My vehicles', icon: 'pi pi-fw pi-car', to: '/vehicles'}
];
</script>

<template>
  <div>
    <p>Navigation</p>
  </div>
  <RouterView />
</template>