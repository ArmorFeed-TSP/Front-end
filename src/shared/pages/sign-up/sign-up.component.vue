<template>
  <div class="bg-sign-up">
    <div class="bg-white sign-up">
      <h1 class="text-center pb-1">Sign Up</h1>
      <div class="p-fluid">
        <div class="field mx-2">
          <pv-dropdown
            id="type-address"
            :options="userTypes"
            optionLabel="label"
            v-model="userType"
            placeholder="I want..."
          ></pv-dropdown>
        </div>
        <div class="field mx-2">
          <pv-input-text placeholder="Name or Social reason"></pv-input-text>
        </div>
        <div class="field md:flex m-2 md:m-0 md:mb-2">
          <pv-input-text class="md:mx-2 mb-2 md:mb-0 w-full" placeholder="RUC"></pv-input-text>
          <pv-input-text
            class="md:mx-2 my-2 md:my-0 w-full"
            placeholder="Cell phone number"
          ></pv-input-text>
        </div>
        <div class="field mx-2">
          <div class="p-input-icon-right md:mt-3">
            <i class="pi pi-envelope" />
            <pv-input-text
              id="email"
              placeholder="Email"
              v-model="email"
              :class="{ 'p-invalid': v$.email.$invalid && submitted }"
              aria-describedby="email-error"
            />
          </div>
        </div>
        <div class="field mx-2">
          <pv-password v-model="password" placeholder="Password" class="w-full">
            <template #header>
              <h4>Pick a password</h4>
            </template>
            <template #footer>
              <pv-divider />
              <p class="mt-2">Suggestions</p>
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </pv-password>
        </div>
        <div class="field mx-2">
          <pv-password
            class="w-full"
            placeholder="Password repeat"
            v-model="passwordRepeat"
          ></pv-password>
        </div>
        <div class="field mx-2">
          <pv-button label="Continue"></pv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "sign-up",
  setup: () => ({ v$: useVuelidate() }),
  data: () => {
    return {
      userTypes: [
        {
          label: "Request shipments",
          type: "customer",
        },
        {
          label: "Make shipments",
          type: "enterprise",
        },
      ],
      submitted: false,
      userType: null,
      name: null,
      ruc: null,
      cellPhone: null,
      email: null,
      password: null,
      passwordRepeat: null,
    };
  },
  validations() {
    return {
      email: {
        required,
      },
    };
  },
};
</script>

<style scoped>
.bg-sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5eced;
  height: 100%;
}
.sign-up {
  width: 100%;
  max-width: 500px;
  min-height: calc(100vh - 80px - 67px);
  padding: 40px 40px;
  height: 100%;
  margin: 30px 10px;
  border-radius: 5px;
  box-shadow: -1px 1px 5px 3px rgba(0, 0, 0, 0.2);
}
@media (min-width: 720px) {
  .sign-up {
    padding: 40px 67px;
  }
}
</style>
