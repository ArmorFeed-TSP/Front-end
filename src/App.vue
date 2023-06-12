<script>
import AppNavigation from "./shared/pages/navigation.component.vue";
import AppFooter from "./shared/pages/footer.component.vue";

export default {
  name: "App",
  components: { AppNavigation, AppFooter },
  data() {
    return {
      userId: null,
      userName: "User Name",
      userType: null,
      navigation: null,
      modoOscuro: false
    };
  },
  methods: {
    userLogged() {
      const auth = JSON.parse(localStorage.getItem("auth"));
      console.log(auth)
      if (auth) {
        this.userId = auth.id;
        this.userType = auth.userType;
        this.userName = auth.name;
        if (this.userType === "customer") {
          this.navigation = [
            {
              label: "Quotation",
              icon: "pi pi-fw pi-home",
              to: "/customers/" + this.userId + "/quotations",
            },
            {
              label: "My shipments",
              icon: "pi pi-fw pi-calendar",
              to: "/customers/" + this.userId + "/shipments",
            },
            {
              label: "My Payments",
              icon: "pi pi-money-bill",
              to: "/customers/" + this.userId + "/payments",
            },
          ];
          this.$router.push({
            name: "customer-quotations",
            params: { id: this.userId },
          });
        } else if (this.userType === "enterprise") {
          this.navigation = [
            {
              label: "My shipments",
              icon: "pi pi-fw pi-calendar",
              to: `/enterprise/${this.userId}/shipments`,
            },
            {
              label: "My Vehicles",
              icon: "pi pi-car",
              to: "/enterprise/" + this.userId + "/vehicles",
            },
            {
              label: "My Payments",
              icon: "pi pi-money-bill",
              to: "/enterprise/" + this.userId + "/payments",
            },
          ];
          this.$router.push({
            name: "enterprise-shipments",
            params: { id: parseInt(this.userId) },
          });
        }
      }
    },
    signOff() {
      this.userId = null;
      this.userType = null;
      this.userName = "User Name";
    },
    alternarModoOscuro() {
      this.modoOscuro = !this.modoOscuro;
    },
  },

  mounted() {
    this.userLogged();
  },
};
</script>
<template>
  <div v-bind:class="{ 'modo-oscuro': modoOscuro }">
    <app-navigation
      v-bind:user-id="userId"
      v-bind:user-type="userType"
      v-bind:user-name="userName"
      v-bind:navigation="navigation"
      :paramActiveTab="0"
      v-on:sign-off="signOff"
      @cambio-modo-oscuro="alternarModoOscuro"
    ></app-navigation>
    <router-view v-on:user-logged="userLogged"></router-view>
    <app-footer></app-footer>
  </div>
</template>
<style>
body {
  margin: 0 0;
}
.modo-oscuro {
  background-color: #212121;
  color: #ffffff;
}
</style>
