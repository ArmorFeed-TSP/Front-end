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
            <pv-dropdown
              :options="userTypes"
              optionLabel="label"
              optionValue="type"
              v-model="userType"
              placeholder="I want..."
            ></pv-dropdown>
              <small v-show="!v$.userType.$model && submitted" class="p-error">
                  There field is required.
              </small>
              <div class="card flex justify-content-center">
                  <pv-button icon="pi pi-info-circle" text rounded aria-label="User types information." @click="showDialog" />
                  <pv-dialog v-model:visible="visible" modal header="User types" :style="{ width: '50vw' }">
                      <p> Request shipments: You are a customer. </p>
                      <p> Make shipments: You are a server. </p>
                  </pv-dialog>
              </div>
          </div>
          <div class="field mx-2">
            <pv-input-text v-model="name" placeholder="Name"></pv-input-text>
            <small v-show="!v$.name.$model && submitted" class="p-error">
              Name is required.
            </small>
          </div>
          <div class="field mx-2" v-if="userType === 'enterprise'">
            <pv-input-number
              class="mb-2"
              v-model="priceBase"
              placeholder="Price Base"
              mode="decimal"
              :minFractionDigits="2"
              v-pv-tooltip.focus="`Enter the price base you'll tax for your services. \n (i.e. 12.5)`"
            ></pv-input-number>
            <pv-input-number
              class="mb-2"
              v-model="factorWeight"
              placeholder="Factor Weight"
              mode="decimal"
              :minFractionDigits="2"
              v-pv-tooltip.focus="`Enter the factor to calculate the price according to the weight/dimensions. \n (i.e. 0.2)`"
            ></pv-input-number>
            <pv-input-number
              v-model="shippingTime"
              placeholder="Shipping Time"
              v-pv-tooltip.focus="`Enter an estimate on the shipping time in hours.`"
            ></pv-input-number>
          </div>
          <div class="field mx-2" v-else-if="userType === 'customer'">
            <pv-input-text
              v-model="lastname"
              placeholder="Lastname"
            ></pv-input-text>
          </div>
          <div class="field mx-2">
            <pv-input-text
              v-model="description"
              placeholder="Description"
              v-pv-tooltip.focus="`Enter a brief description of your business/services.`"
            ></pv-input-text>
          </div>
          <div class="field mx-2">
            <pv-input-text
                    v-model="photo"
                    placeholder="Photo"
                    v-pv-tooltip.focus="`Paste here the URL to your Profile Picture`"
            ></pv-input-text>
          </div>
          <div class="field md:flex m-2 md:mb-2">
            <div class="md:mr-1">
              <pv-input-mask
                class="mb-2 md:mb-0"
                placeholder="RUC"
                v-model="ruc"
                mask="999 999 999 999"
              ></pv-input-mask>
              <small v-show="!v$.ruc.$model && submitted" class="p-error">
                RUC is required.
              </small>
            </div>
            <div class="md:ml-1">
              <pv-input-mask
                class="my-2 md:my-0"
                placeholder="Cell phone number"
                v-model="cellPhone"
                mask="999 999 999"
              ></pv-input-mask>
              <small v-show="!v$.cellPhone.$model && submitted" class="p-error">
                Cell phone is required.
              </small>
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
                <template #header>
                    <h6>Enter a password</h6>
                </template>
                <template #footer>
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </template>
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
            <p v-if="notMatch" class="p-error">Passwords do not match.</p>
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
            > I agree to the terms and conditions* </label>
              <pv-button icon="pi pi-eye" text rounded aria-label="Terms and Conditions." @click="showTermsAndConditions" />
              <pv-dialog v-model:visible="visibleTC" modal header="Terms and Conditions" :style="{ width: '50vw' }">
                  <p><strong>T&eacute;rminos y Condiciones de Uso de la Aplicaci&oacute;n <em>ArmorFeed</em></strong></p>
                  <p>Estos t&eacute;rminos y condiciones (en adelante &quot;T&eacute;rminos&quot;) rigen el uso de la aplicaci&oacute;n ArmorFeed (en adelante &quot;la Aplicaci&oacute;n&quot;) ofrecida por SoftTeam (en adelante &quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la Empresa&quot;) a trav&eacute;s de <a data-fr-linked="true" href="https://armorfeed-58165.web.app/sign-in">https://armorfeed-58165.web.app/sign-in</a> (en adelante &quot;la Plataforma&quot;). Al utilizar la Aplicaci&oacute;n, usted (en adelante &quot;el Usuario&quot;, &quot;usted&quot; o &quot;su&quot;) acepta y se compromete a cumplir con estos T&eacute;rminos en su totalidad. Si no est&aacute; de acuerdo con estos T&eacute;rminos, no utilice la Aplicaci&oacute;n.</p>
                  <p><u>Uso de la Aplicaci&oacute;n</u></p>
                  <ol style="list-style-type: lower-alpha;">
                      <li>La Aplicaci&oacute;n tiene como objetivo ser una plataforma intermediaria entre las empresas de seguridad de log&iacute;stica de valores o courier y las empresas que requieren servicios de transporte seguro y confiable para productos o artefactos de alto valor.</li>
                      <li>b. El Usuario es responsable de proporcionar informaci&oacute;n precisa y actualizada al registrarse en la Aplicaci&oacute;n, y se compromete a mantener dicha informaci&oacute;n actualizada en todo momento.</li>
                      <li>El Usuario se compromete a utilizar la Aplicaci&oacute;n de manera legal y de acuerdo con estos T&eacute;rminos. Queda estrictamente prohibido el uso de la Aplicaci&oacute;n con fines ilegales, fraudulentos o que violen los derechos de terceros.</li>
                      <li>El Usuario acepta que la Empresa puede recopilar, utilizar y compartir su informaci&oacute;n personal de acuerdo con la Pol&iacute;tica de Privacidad de la Aplicaci&oacute;n, la cual se encuentra disponible en <a href="//www.upc.edu.pe">www.upc.edu.pe</a>.</li>
                      <li>El Usuario es responsable de mantener la confidencialidad de su nombre de usuario y contrase&ntilde;a de la Aplicaci&oacute;n, y acepta notificar a la Empresa de inmediato cualquier uso no autorizado de su cuenta.</li>
                      <li>La Aplicaci&oacute;n puede contener enlaces a sitios web o servicios de terceros. La Empresa no se hace responsable del contenido, precisi&oacute;n, seguridad o cualquier otro aspecto de dichos sitios web o servicios de terceros.</li>
                  </ol>
                  <p><br></p>
                  <p><u>Propiedad Intelectual</u></p>
                  <ol style="list-style-type: lower-alpha;">
                      <li>Todos los derechos de propiedad intelectual relacionados con la Aplicaci&oacute;n son propiedad exclusiva de la Empresa o sus licenciantes. El Usuario reconoce y acepta que no adquiere ning&uacute;n derecho de propiedad sobre la Aplicaci&oacute;n al utilizarla.</li>
                      <li>El Usuario se compromete a no copiar, modificar, distribuir, transmitir, mostrar, realizar, reproducir, publicar, licenciar, crear obras derivadas, transferir o vender cualquier contenido o informaci&oacute;n obtenida de la Aplicaci&oacute;n sin el consentimiento previo y por escrito de la Empresa.</li>
                  </ol>
                  <p><br></p>
                  <p><u>Responsabilidad</u></p>
                  <ol style="list-style-type: lower-alpha;">
                      <li>La Empresa se esfuerza por mantener la Aplicaci&oacute;n disponible y funcionando de manera correcta en todo momento. Sin embargo, no garantizamos que la Aplicaci&oacute;n est&eacute; libre de errores, virus, interrupciones, o que funcione de manera ininterrumpida o sin retrasos.</li>
                      <li>El Usuario utiliza la Aplicaci&oacute;n bajo su propio riesgo y acepta que la Empresa no ser&aacute; responsable de cualquier da&ntilde;o directo, indirecto, incidental, especial, consecuencial o punitivo que pueda surgir del uso de la Aplicaci&oacute;n, incluyendo, pero no limitado a, p&eacute;rdida de datos, p&eacute;rdida de ingresos, p&eacute;rdida de oportunidades de negocio, o cualquier otro tipo de p&eacute;rdida o da&ntilde;o.</li>
                      <li>El Usuario acepta que la Empresa no es responsable de cualquier inconveniente, retraso, p&eacute;rdida, da&ntilde;o, costo o gasto, ya sea directo o indirecto, que pueda surgir debido a la conducta de terceros, incluyendo, pero no limitado a, empresas de seguridad de log&iacute;stica de valores, courier u otras empresas o proveedores de servicios relacionados.</li>
                      <li>El Usuario se compromete a indemnizar y mantener indemne a la Empresa, sus directores, empleados, representantes y afiliados, de cualquier reclamo, demanda, p&eacute;rdida, responsabilidad, da&ntilde;o o gasto (incluyendo honorarios legales razonables) que surja o est&eacute; relacionado con el uso de la Aplicaci&oacute;n o el incumplimiento de estos T&eacute;rminos.</li>
                  </ol>
                  <p><br></p>
                  <p><u>Modificaciones y Terminaci&oacute;n</u></p>
                  <ol style="list-style-type: lower-alpha;">
                      <li>La Empresa se reserva el derecho de modificar, suspender, interrumpir o cerrar la Aplicaci&oacute;n en cualquier momento, con o sin previo aviso.</li>
                      <li>La Empresa puede modificar estos T&eacute;rminos en cualquier momento mediante la publicaci&oacute;n de los T&eacute;rminos modificados en la Plataforma. El Usuario se compromete a revisar peri&oacute;dicamente los T&eacute;rminos y a estar al tanto de cualquier cambio. El uso continuo de la Aplicaci&oacute;n despu&eacute;s de la modificaci&oacute;n de los T&eacute;rminos constituir&aacute; la aceptaci&oacute;n de los T&eacute;rminos modificados.</li>
                      <li>El Usuario puede terminar su cuenta en la Aplicaci&oacute;n en cualquier momento enviando una solicitud de cancelaci&oacute;n a la Empresa. La Empresa se reserva el derecho de terminar o suspender la cuenta del Usuario en la Aplicaci&oacute;n por cualquier motivo, con o sin previo aviso.</li>
                  </ol>
                  <p><br></p>
                  <p><u>Ley Aplicable y Jurisdicci&oacute;n</u></p>
                  <ol style="list-style-type: lower-alpha;">
                      <li>Estos T&eacute;rminos se regir&aacute;n e interpretar&aacute;n de acuerdo con las leyes del Per&uacute; sin tener en cuenta sus conflictos de disposiciones legales.</li>
                      <li>Cualquier disputa o reclamo relacionado con la Aplicaci&oacute;n o estos T&eacute;rminos se resolver&aacute; exclusivamente ante los tribunales competentes del Per&uacute; a los que ambas partes se someten irrevocablemente.</li>
                  </ol>
                  <p><br></p>
                  <p><u>Disposiciones Generales</u></p>
                  <ol style="list-style-type: lower-alpha;">
                      <li>Estos T&eacute;rminos constituyen el acuerdo completo entre el Usuario y la Empresa con respecto al uso de la Aplicaci&oacute;n, y reemplazan cualquier otro acuerdo o entendimiento previo, ya sea escrito o verbal, con respecto a la Aplicaci&oacute;n.</li>
                      <li>Si alguna disposici&oacute;n de estos T&eacute;rminos se considera inv&aacute;lida, ilegal o inaplicable por cualquier raz&oacute;n, dicha disposici&oacute;n se considerar&aacute; separada del resto de los T&eacute;rminos y no afectar&aacute; la validez o aplicabilidad de las dem&aacute;s disposiciones.</li>
                      <li>El hecho de que la Empresa no ejerza o haga valer cualquier derecho o disposici&oacute;n de estos T&eacute;rminos no constituir&aacute; una renuncia a dicho derecho o disposici&oacute;n.</li>
                      <li>El Usuario no puede ceder, transferir o sublicenciar ninguno de sus derechos u obligaciones bajo estos T&eacute;rminos sin el consentimiento previo y por escrito de la Empresa.</li>
                  </ol>
                  <p>Al utilizar la Aplicaci&oacute;n, el Usuario declara que ha le&iacute;do, entendido y aceptado estos T&eacute;rminos en su totalidad.</p>
                  <template #footer>
                      <pv-button label="Close" icon="pi pi-check" @click="visibleTC = false" autofocus />
                  </template>
              </pv-dialog>
          </div>
          <div class="field mx-2 md:flex">
            <pv-button
              label="Come back"
              class="mb-2 md:mb-0 md:mr-2 p-button-info"
              @click="goToSignIn"
            ></pv-button>
            <pv-button
              label="Sign Up"
              type="submit"
              class="p-button-success"
            ></pv-button>
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
      visible: false,
      visibleTC: false,
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
    showDialog() {
      this.visible = true;
    },
    showTermsAndConditions() {
      this.visibleTC = true;
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