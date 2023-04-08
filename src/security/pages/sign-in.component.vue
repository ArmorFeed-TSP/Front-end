<template>
  <div class="bg-sign-in">
    <div class="sign-in bg-white">
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <h1 class="text-center font-bold mb-5">ArmorFeed</h1>
        <div class="p-fluid">
          <div class="field pt-4">
            <pv-button label="Sign In" type="submit"></pv-button>
          </div>
          <div class="text-center pt-2">
            <router-link to="/" class="mt-0 no-underline"
              >Forgot your password?</router-link
            >
            <p>
              Don't have an account?
              <router-link class="no-underline" to="/sign-up"
                >Click here.</router-link
              >
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import SignInService from "../../shared/services/sign-in.service";
export default {
  name: "sign-in",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: null,
      submitted: false,
      password: null,
      notFound: false,
    };
  },
  validations() {
    return {
      email: {
        required,
      },
      password: {
        required,
      },
    };
  },
  methods: {
    async handleSubmit(isFormValid) {
      this.submitted = true;
      this.notFound = false;
      if (isFormValid) {
        const loginResource = this.loginDto();
        this.$store
          .dispatch("auth/login", loginResource)
          .then((response) => {
            this.$dataTransfer.user = response.data;
            this.$emit("user-logged");
          })
          .catch((error) => {
            document.getElementById("password").focus();
            console.log(error.message)
            if (error.request.status === 0 || error.request.status === 500) {
              alert("Service not available");
            }
            else {
              alert("An error has occurred, contact the area in charge")
            }
          });
      }
    },
    loginDto() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
};
</script>

<style>
.bg-sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5eced;
  height: 100%;
}
.sign-in {
  width: 100%;
  max-width: 500px;
  min-height: calc(100vh - 208px);
  padding: 40px 40px;
  height: 100%;
  margin: 30px 10px;
  border-radius: 5px;
  box-shadow: -1px 1px 5px 5px rgba(0, 0, 0, 0.3);
}
@media (min-width: 720px) {
  .sign-in {
    padding: 40px 67px;
  }
}
</style>
