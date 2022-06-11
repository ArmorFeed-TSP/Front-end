<script>
import AppNavigation from "./shared/pages/navigation/navigation.component.vue";
import AppFooter from "./shared/pages/footer/footer.component.vue";

export default {
  name: "App",
  components: { AppNavigation, AppFooter },
  data() {
    return {
      userId: null,
      userName: "User Name",
      userType: null,
    };
  },
  methods: {
    userLogged() {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        this.userId = auth.user.id;
        this.userType = auth.user.userType;
        this.userName = auth.user.name;
        this.$dataTransfer.canDisplayNavigation = true;
        if (this.userType === "customer")
          this.$router.push({
            name: "customer-quotations",
            params: { id: this.userId },
          });
        else if (this.userType === "enterprise")
          this.$router.push({ name: "enterprise-shipments", params: {id: parseInt(this.userId) } });
      }
    },
    signOff() {
      this.userId = null;
      this.userType = null;
      this.userName = "User Name";
    }
  },
  mounted() {
    this.userLogged();
  },
  updated() {
    this.userLogged();
  }
};
</script>
<template>
  <div class="w-full">
    <app-navigation
      v-bind:user-id="userId"
      v-bind:user-type="userType"
      v-bind:user-name="userName"
      :paramActiveTab="0"
      v-on:sign-off="signOff"
    ></app-navigation>
    <router-view v-on:user-logged="userLogged"></router-view>
    <app-footer></app-footer>
  </div>
</template>
<style>
body {
  margin: 0 0;
}
</style>
