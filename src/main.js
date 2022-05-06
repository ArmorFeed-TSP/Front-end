import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

//PrimeVue Styles
import "/node_modules/primeflex/primeflex.css";

import "primevue/resources/themes/mdc-dark-indigo/theme.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Steps from "primevue/steps";
import ToastService from "primevue/toastservice";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Column from "primevue/column";
import Rating from "primevue/rating";
import Toast from "primevue/toast";
import Avatar from "primevue/avatar";
import InputMask from "primevue/inputmask";

const app = createApp(App);

app.use(router);

//PrimeVue Configuration
app.use(PrimeVue, { ripple: true });

app.use(ToastService);

//PrimeVue Components
app.component("pv-toast", Toast);
app.component("pv-data-table", DataTable);
app.component("pv-column", Column);
app.component("pv-rating", Rating);
app.component("pv-button", Button);
app.component("pv-step", Steps);
app.component("pv-card", Card);
app.component("pv-input-text", InputText);
app.component("pv-input-number", InputNumber);
app.component("pv-input-mask", InputMask);
app.component("pv-dropdown", Dropdown);
app.component("pv-avatar", Avatar);

app.mount("#app");
