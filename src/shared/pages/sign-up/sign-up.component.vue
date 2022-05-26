<template>
  <div class="bg-sign-up">
    <div class="bg-white sign-up">
      <h1 class="text-center mb-2">Sign Up</h1>
      <p class="text-center mb-4 mt-0">Join and start ordering or shipping.</p>
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-fluid">
          <div class="field mx-2">
            <pv-dropdown
              :options="userTypes"
              optionLabel="label"
              optionValue="type"
              v-model="userType"
              placeholder="I want..."
            ></pv-dropdown>
            <small v-show="!v$.userType.$model && submitted" class="p-error"
              >There field is required.</small
            >
          </div>
          <div class="field mx-2">
            <pv-input-text
              v-model="name"
              placeholder="Name or Social reason"
            ></pv-input-text>
            <small v-show="!v$.name.$model && submitted" class="p-error"
              >Name is required.</small
            >
          </div>
          <div class="field md:flex m-2 md:mb-2">
            <div class="md:mr-1">
              <pv-input-mask
                class="mb-2 md:mb-0"
                placeholder="RUC"
                v-model="ruc"
                mask="999 999 999 999"
              ></pv-input-mask>
              <small v-show="!v$.ruc.$model && submitted" class="p-error"
                >RUC is required.</small
              >
            </div>
            <div class="md:ml-1">
              <pv-input-mask
                class="my-2 md:my-0"
                placeholder="Cell phone number"
                v-model="cellPhone"
                mask="999 999 999"
              ></pv-input-mask>
              <small v-show="!v$.cellPhone.$model && submitted" class="p-error"
                >Cell phone is required.</small
              >
            </div>
          </div>
          <div class="field mx-2">
            <div class="p-input-icon-right md:mt-3">
              <i class="pi pi-envelope" />
              <pv-input-text
                id="email-error"
                placeholder="Email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
            </div>
            <span v-if="v$.email.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.email.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.email.$invalid && submitted) || v$.email.$pending.$response
              "
              class="p-error"
              >{{ v$.email.required.$message.replace("Value", "Email") }}</small
            >
          </div>
          <div class="field mx-2">
            <pv-password
              v-model="password"
              placeholder="Password"
              class="w-full"
            >
            </pv-password>
            <span v-if="v$.password.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.password.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>
          <div class="field mx-2">
            <pv-password
              class="w-full"
              placeholder="Password repeat"
              v-model="passwordRepeat"
            >
              <template #footer>
                <pv-divider></pv-divider>
                <div
                  v-if="passwordMatches && password != null"
                  class="flex align-items-center"
                >
                  <i class="pi pi-check mr-2"></i>
                  <p class="">The passwords match.</p>
                </div>
                <div
                  v-else-if="!passwordMatches && password != null"
                  class="flex align-items-center"
                >
                  <i class="pi pi-times mr-2 p-error"></i>
                  <p class="p-error">Passwords do not match.</p>
                </div>
              </template>
            </pv-password>
            <small
              v-show="!v$.passwordRepeat.$model && submitted"
              class="p-error"
              >Password is required.</small
            >
          </div>
          <div class="field-checkbox m-2 my-4">
            <pv-checkbox
              id="accept"
              name="accept"
              value="Accept"
              v-model="v$.accept.$model"
              :class="{ 'p-invalid': v$.accept.$invalid && submitted }"
            />
            <label
              for="accept"
              :class="{ 'p-error': v$.accept.$invalid && submitted }"
              >I agree to the terms and conditions*</label
            >
          </div>
          <div class="field mx-2">
            <pv-button label="Continue" type="submit"></pv-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import SignUpService from "../../services/sign-up.service.js";
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
      accept: null,
    };
  },
  computed: {
    passwordMatches() {
      return this.password === this.passwordRepeat;
    },
  },
  validations() {
    return {
      userType: {
        required,
      },
      name: {
        required,
      },
      ruc: {
        required,
      },
      cellPhone: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: 5,
      },
      passwordRepeat: {
        required,
        minLength: 5,
      },
      accept: {
        required,
      },
    };
  },
  methods: {
    async signUpUser(newUser) {
      await SignUpService.create(newUser)
        .then((response) => {
          console.log(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.accessToken)
          );
          this.$toast.add({
            severity: "success",
            summary: "Registered User",
            detail: "We welcome you " + response.data.user.name + " !",
            life: 6000,
          });
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    createNewUser() {
      return {
        email: this.email,
        password: this.password,
        userType: this.userType,
        name: this.name,
        ruc: this.ruc,
        cellPhone: this.cellPhone,
      };
    },
    async handleSubmit(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        const newUser = this.createNewUser();
        await this.signUpUser(newUser);
        this.resetForm();
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if (user.userType === "customer")
          await this.$router.push({
            name: "customer-quotations",
            params: { id: user.id },
          });
        else if (user.userType === "enterprise")
          await this.$router.push({
            name: "enterprise-shipments",
            params: { id: user.id },
          });
      }
    },
    resetForm() {
      this.submitted = false;
      this.userType = null;
      this.name = null;
      this.ruc = null;
      this.cellPhone = null;
      this.email = null;
      this.password = null;
      this.passwordRepeat = null;
      this.accept = null;
    },
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
