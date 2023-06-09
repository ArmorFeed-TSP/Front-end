<template>
  <div class="navigation-container">
    <pv-tool-bar>
      <template #start>
        <a href="/" class="no-underline">
          <div class="flex align-items-center">
            <img
              class="logo"
              src="https://i.ibb.co/XkF6Dx6/Logo.png"
              alt="Logo of ArmorFeed"
            />
            <h1 class="text-lg text-black-alpha-70">ArmorFeed</h1>
          </div>
        </a>
      </template>
      <template #end>
        <pv-button
          v-if="this.userType"
          icon="pi pi-bell"
          @click="openNotification"
          class="p-button-rounded p-button-text"
        ></pv-button>
        <pv-button
          icon="pi pi-cog"
          class="p-button-rounded p-button-text p-toolbar-separator"
          @click="toggle"
        ></pv-button>
        <pv-button
          v-if="this.userType"
          class="p-button-rounded p-button-text"
          icon="pi pi-user"
          icon-pos="left"
          :label="this.userName"
          @click="profileDisplayable = true"
        ></pv-button>
      </template>
    </pv-tool-bar>
    <pv-overlay-panel ref="op" style="width: 300px" :dismissable="true" el="el">
      <div class="p-fluid">
        <h3>Settings</h3>
        <pv-divider></pv-divider>
        <div class="field flex">
          <pv-button class="mr-1" icon="pi pi-sun" label="Light" v-on:click="setDarkMode(false)"></pv-button>
         <pv-button class="ml-1" icon="pi pi-moon" label="Dark" v-on:click="setDarkMode(true)"></pv-button>
        </div>
      </div>
    </pv-overlay-panel>
    <pv-overlay-panel ref="nt" style="width: 400px" :dismissable="true" el="el">
      <Notifications></Notifications>
    </pv-overlay-panel>
  </div>
  <div v-if="this.userType" class="flex justify-content-center">
    <pv-tab-menu :model="navigation" :exact="false" />
  </div>
  <pv-dialog v-model:visible="profileDisplayable">
    <profile-component @logout="logOut"/>
  </pv-dialog>
</template>

<script>
import Notifications from "../../notifications/pages/notifications.vue";
import { CustomerShipmentsApiService } from "../../shipments/customer-shipments/services/customer-shipments-api.service";
import { EnterpriseShipmentsService } from "../../shipments/enterprise-shipments/services/enterprise-shipments.service";
import ProfileComponent from "./profile.component.vue";

export default {
  name: "navigation-shipment",
  components: { Notifications, ProfileComponent },
  data() {
    return {
      activeTab: 0,
      isDark: null,
      navigationEnterprise: [
        {
          label: "My shipments",
          icon: "pi pi-fw pi-calendar",
          to: `/enterprise/0/shipments`,
        },
        {
          label: "My Vehicles",
          icon: "pi pi-car",
          to: "/enterprise/0/vehicles",
        },
        {
          label: "My Payments",
          icon: "pi pi-money-bill",
          to: "/enterprise/0/payments",
        },
      ],
      navigationCustomer: [
        {
          label: "Quotation",
          icon: "pi pi-fw pi-home",
          to: "/customers/0/quotations",
        },
        {
          label: "My shipments",
          icon: "pi pi-fw pi-calendar",
          to: "/customers/0/shipments",
        },
        {
          label: "My Payments",
          icon: "pi pi-money-bill",
          to: "/customers/0/payments",
        },
      ],
      selectedTabs: {
        shipments: false,
        quotations: false,
      },
      user: null,
      profileDisplayable: false
    };
  },
  watch: {
  '$store.state.darkMode'(newValue) {
    if (newValue) {
      document.body.style.backgroundColor = 'rgba(63, 81, 181, 0.92)';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }
},
  methods: {
    setDarkMode(isDark) {
    this.$store.commit('setDarkMode', isDark);
  },
    toggle(event) {
      event.preventDefault();
      this.$refs.op.toggle(event);
    },
    toggleUser(event) {
      event.preventDefault();
      this.$refs.user.toggle(event);
    },
    openNotification(event) {
      event.preventDefault();
      this.$refs.nt.toggle(event);
    },
    async logOut() {
      this.$dataTransfer.canDisplayNavigation = false;
      this.user = null;
      this.$store.dispatch("auth/logout");
      await this.$emit("sign-off");
      await this.$router.push({ name: "root" });
      this.$refs.op.hide();
      this.profileDisplayable = false;
    },
    getAllShipmentsById(id) {
      const customerShipmentsService = new CustomerShipmentsApiService();
      customerShipmentsService.findByCustomerId(id).then((response) => {
        response.data.forEach((shipment) => {
          this.$dataTransfer.addCustomerShipmentId(shipment.id);
        });
      });
      const enterpriseShipmentsService = new EnterpriseShipmentsService();
      enterpriseShipmentsService.getShipmentsById(id).then((response) => {
        response.data.forEach((shipment) => {
          this.$dataTransfer.addEnterpriseShipmentId(shipment.id);
        });
      });
    },
    UserId() {
      return !this.user ? this.userId : this.user.id;
    },
  },
  props: {
    items: Array,
    userId: Number,
    userName: String,
    userType: String,
    navigation: Array,
  },
  updated() {
    if (this.$dataTransfer.canDisplayNavigation) {
      this.activeTab = 1;
      this.user = JSON.parse(localStorage.getItem("auth"));
      this.navigationEnterprise = [
        {
          label: "My shipments",
          icon: "pi pi-fw pi-calendar",
          to: `/enterprise/${this.user.id}/shipments`,
        },
        {
          label: "My Vehicles",
          icon: "pi pi-car",
          to: "/enterprise/" + this.user.id + "/vehicles",
        },
        {
          label: "My Payments",
          icon: "pi pi-money-bill",
          to: "/enterprise/" + this.user.id + "/payments",
        },
      ];
      this.navigationCustomer = [
        {
          label: "Quotation",
          icon: "pi pi-fw pi-home",
          to: "/customers/" + this.user.id + "/quotations",
        },
        {
          label: "My shipments",
          icon: "pi pi-fw pi-calendar",
          to: "/customers/" + this.user.id + "/shipments",
        },
        {
          label: "My Payments",
          icon: "pi pi-money-bill",
          to: "/customers/" + this.user.id + "/payments",
        },
      ];
    }
  },
  mounted() {
    this.$nextTick(() => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        this.user = auth;
      }
      this.activeTab = 1;
    });
  },
};
</script>

<style>
.navigation-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
.logo {
  height: 45px;
}
.modo-oscuro {
  background-color: #212121;
  color: #ffffff;
}
.dark-theme .p-toolbar {
  background-color: #555 !important;
  color: #fff !important;
}
</style>
