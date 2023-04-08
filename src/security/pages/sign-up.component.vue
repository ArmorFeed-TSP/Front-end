<template>
  <div class="bg-sign-up">
    <div class="bg-white sign-up">
      <h2 class="text-center mb-2">Create an ArmorFeed account</h2>
      <p class="text-center mb-4 mt-0">Join and start ordering or shipping.</p>
      <div v-if="isConfirm">
        <div class="p-fluid">
          <div>
            <p class="font-bold success-color">
              Congratulation {{ name }}, your account has been created!
            </p>
            <p>
              A confirmation message has been sent to your email
              <span class="text-primary email-style">{{ email }}</span
              >.
            </p>
          </div>
          <div class="field mt-8">
            <pv-button label="Come back" @click="comeBack"></pv-button>
          </div>
          <div class="field">
            <pv-button label="Sign In" @click="goToSignIn"></pv-button>
          </div>
        </div>
      </div>
      <form v-else @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-fluid">
          <div class="field mx-2">
            <pv-drop-down :options="userTypes" optionLabel="label" optionValue="type" v-model="userType" placeholder="I want to..."></pv-drop-down>
            <small v-show="!v$.userType.$model && submitted" class="p-error">
              This field is required.
            </small>
          </div>
          <div class="field mx-2">
            <pv-input-text v-model="name" placeholder="Name"></pv-input-text>
            <small v-show="!v$.name.$model && submitted" class="p-error">
              Name is required.
            </small>
          </div>
          <div class="field mx-2" v-if="userType === 'enterprise'">
            <pv-input-number class="mb-2" v-model="priceBase" placeholder="Price base" mode="decimal" :minFractionDigits="2"></pv-input-number>
            <pv-input-number class="mb-2" v-model="factorWeight" placeholder="Factor weight" mode="decimal" :minFractionDigits="2"></pv-input-number>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import SignUpService from "../../shared/services/sign-up.service.js";
export default {
  name: "sign-up",
  components: { PvInputNumber, PvInputText, PvDropDown },
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
      isConfirm: false,
      submitted: false,
      userType: null,
      name: null,
      ruc: null,
      cellPhone: null,
      email: null,
      password: null,
      passwordRepeat: null,
      description: null,
      photo: null,
      accept: null,
      notMatch: false,
      priceBase: null,
      factorWeight: null,
      shippingTime: null,
      lastname: null,
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
          localStorage.setItem("auth", JSON.stringify(response.data));
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    comeBack() {
      this.isConfirm = false;
      this.resetForm();
    },
    goToSignIn() {
      this.isConfirm = false;
      this.resetForm();
      this.$router.push({ name: "sign-in" });
    },
    createNewUser() {
      if (this.userType === "customer") {
        return {
          email: this.email,
          password: this.password,
          name: this.name,
          ruc: this.ruc.split(" ").join(""),
          phoneNumber: this.cellPhone.split(" ").join(""),
          description: this.description,
          photo: this.photo,
          lastname: this.lastname,
          subscriptionPlan: 0,
        };
      }
      return {
        email: this.email,
        password: this.password,
        name: this.name,
        ruc: this.ruc.split(" ").join(""),
        phoneNumber: this.cellPhone.split(" ").join(""),
        priceBase: this.priceBase,
        factorWeight: this.factorWeight,
        shippingTime: this.shippingTime,
        description: this.description,
        photo: this.photo,
        score: 0,
      };
    },
    async handleSubmit(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.password === this.passwordRepeat) {
          this.notMatch = false;
          const newUser = this.createNewUser();
          console.log(newUser);
          if (this.userType === "customer") {
            this.$store
              .dispatch("auth/registerCustomer", newUser)
              .then((response) => {
                this.isConfirm = true;
                this.resetForm();
                console.log(response.data);
              });
          } else if (this.userType === "enterprise") {
            this.$store
              .dispatch("auth/registerEnterprise", newUser)
              .then((response) => {
                this.isConfirm = true;
                this.resetForm();
                console.log(response.data);
              });
          }
          // this.signUpUser(newUser);
        } else this.notMatch = true;
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
  .email-style:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .success-color {
    color: #28a745;
    text-align: center;
    padding: 2px 2px;
    border-style: dashed;
    border-width: 3px;
  }
}
</style>
