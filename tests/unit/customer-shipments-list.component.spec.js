import { mount, shallowMount } from '@vue/test-utils'
import CustomerShipmentsList from "../../src/shipments/customer-shipments/pages/customer-shipments-list.component.vue";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/datatable';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import router from '../router/router';

test('renders correctly', async () => {
  router.push("/customers/2/shipments");
  await router.isReady();
  const wrapper = shallowMount(CustomerShipmentsList, {
    props: {
      id: 2
    },
    global: {
      components: {
        "pv-dropdown": Dropdown,
        "pv-button": Button,
        "pv-input-text": InputText,
        "pv-data-table": DataTable,
        "pv-column": Column
      },
      plugins: [PrimeVue],
    }
  });
  expect(wrapper.exists()).toBeTruthy();
});