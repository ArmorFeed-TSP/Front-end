import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';

//PrimeVue Styles
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/themes/mdc-dark-indigo/theme.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";

const app = createApp(App);

app.use(router);

//PrimeVue Configuration
app.use(PrimeVue, { ripple: true });

//PrimeVue Components
app.component('pv-drop-down',Dropdown);
app.component('pv-tab-view',TabView);
app.component('pv-tab-panel',TabPanel);
app.component('pv-tab-menu',TabMenu);
app.component('pv-data-table',DataTable);
app.component('pv-column',Column);
app.component('pv-row',Row);
app.component('pv-button',Button);
app.component('pv-dialog',Dialog);
app.component('pv-calendar',Calendar);
app.component('pv-input-text',InputText);
app.mount("#app");
