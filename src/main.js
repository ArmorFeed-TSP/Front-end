import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import TabMenu from 'primevue/tabmenu';

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
app.component('DropDown',Dropdown);
app.component('TabView',TabView);
app.component('TabPanel',TabPanel);
app.component('TabMenu',TabMenu);
app.mount("#app");
