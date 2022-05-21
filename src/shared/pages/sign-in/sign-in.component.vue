<template>
  <div class="bg-sign-in">
    <div class="sign-in bg-white">
      <h1 class="text-center font-bold mb-5">Sign in</h1>
      <div class="p-fluid">
        <div class="field">
          <p v-if="error" class="text-lg line-height-3 p-error">
            The account or password is incorrect. If you don't remember the
            account,
            <router-link class="no-underline" to="">reset it now.</router-link>
          </p>
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <pv-input-text
              id="email"
              v-model="email"
              :class="{ 'p-invalid': v$.email.$invalid && submitted }"
              aria-describedby="email-error"
              placeholder="Email"
            ></pv-input-text>
          </div>
        </div>
        <div class="field">
          <pv-password
            placeholder="Password"
            v-model="password"
            :feedback="false"
            :showIcon="true"
          ></pv-password>
        </div>
        <div class="field">
          <p>
            Don't have an account?
            <router-link to="/sign-up">Click here.</router-link>
          </p>
        </div>
        <div class="field pt-4">
          <pv-button label="Start"></pv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "sign-in",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: null,
      submitted: false,
      password: null,
      error: false,
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
