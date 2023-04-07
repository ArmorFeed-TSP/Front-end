import { mount } from '@vue/test-utils'
import component from "../../src/shipments/customer-shipments/pages/customer-shipments-list.component.vue"
import PrimeVue from 'primevue/config';

test('renders correctly', () => {
  const wrapper = mount(component, {
    global: {
      plugins: [PrimeVue],
    }
  });
  const existsColumns = wrapper.vm.columns !== undefined && wrapper.vm.columns.length >= 1;
  const existsFilters = wrapper.vm.filters !== undefined && Object.keys(wrapper.vm.filters).length >= 1;
  expect(existsColumns).toBe(true);
  expect(existsFilters).toBe(true);
})