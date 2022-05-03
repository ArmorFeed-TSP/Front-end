<script setup>
import Navigation from './Navigation/Navigation.component.vue';
const items = [
  {label: 'Home', icon: 'pi pi-fw pi-home', to:'/'},
  {label: 'Calendar', icon: 'pi pi-fw pi-calendar', to:'/Shipments'},
  {label: 'Edit', icon: 'pi pi-fw pi-pencil', to: '/'},
  {label: 'Documentation', icon: 'pi pi-fw pi-file', to: '/'},
  {label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/'}
];
</script>
<template>
  <div class="w-full">
    <Navigation :items="items" :paramActiveTab="0"></Navigation>
    <router-view/>
  </div>
</template>
