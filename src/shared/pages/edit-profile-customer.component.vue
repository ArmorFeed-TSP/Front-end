<template>
    <h3 class="edit-profile-title">Edit profile</h3>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="edit-form">
        <div class="flex flex-column gap-2">
            <label for="name" class="font-bold block mb-2">Name</label>
            <pv-input-text id="name" v-model="name"/>
            <span v-if="v$.name.$error" class="invalid">
                {{ v$.name.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="description" class="font-bold block mb-2">Description</label>
            <pv-input-text id="description" type="text" v-model="description"/>
            <span v-if="v$.description.$error" class="invalid">
                {{ v$.description.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="withoutgrouping" class="font-bold block mb-2">Ruc</label>
            <pv-input-number v-model="ruc" inputId="withoutgrouping" :useGrouping="false"/>
            <span v-if="v$.ruc.$error" class="invalid">
                {{ v$.ruc.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="withoutgrouping" class="font-bold block mb-2">Phone Number</label>
            <pv-input-number v-model="phoneNumber" inputId="withoutgrouping" :useGrouping="false"/>
            <span v-if="v$.phoneNumber.$error" class="invalid">
                {{ v$.phoneNumber.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="email" class="font-bold block mb-2">Email</label>
            <pv-input-text id="email" type="text" v-model="email"/>
            <span v-if="v$.email.$error" class="invalid">
                {{ v$.email.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="image" class="font-bold block mb-2">Image</label>
            <pv-file-upload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            customUpload
            @uploader="uploadImage"
            />
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="lastName" class="font-bold block mb-2">Last Name</label>
            <pv-input-text id="lastName" type="text" v-model="lastName"/>
            <span v-if="v$.lastName.$error" class="invalid">
                {{ v$.lastName.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="subscriptionPlan" class="font-bold block mb-2">Subscription Plan</label>
            <pv-dropdown id="subscriptionPlan" v-model="subscriptionPlan" editable :options="subscriptionPlanOptions" optionLabel="name" placeholder="Select a subscription plan" class="w-full md:w-14rem" />
            <span v-if="v$.subscriptionPlan.$error" class="invalid">
                {{ v$.subscriptionPlan.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <pv-button type="submit" label="Save changes"></pv-button>
        <pv-divider/>
        <pv-button type="button" label="Cancel changes" @click="cancelChanges"></pv-button>
    </form>
    <pv-toast/>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, minValue, maxValue, helpers } from '@vuelidate/validators';
import { Base64Manager } from '../services/base64-uploader.service';
import { ProfileApiService } from "../services/profile-api.service";
export default {
    name: "edit-profile-customer-component",
    data() {
        return  {
            v$: useVuelidate(),
            userType: null,
            name: null,
            photo: null,
            ruc: null,
            phoneNumber: null,
            description: null,
            email: null,
            lastName: null,
            subscriptionPlan: null,
            subscriptionPlanOptions: [
                {
                    name: "Free", code: 0
                },
                {
                    name: "Premium", code: 1
                }
            ],
            imageConverter: new Base64Manager(),
            imageDataHandler: { data: null },
            profileApiService: new ProfileApiService(),
            userType: null,
            user: null
        }
    },
    created() {
        this.userType = localStorage.getItem("type");
        const res = JSON.parse(localStorage.getItem("auth"));
        if(res.data) this.user = res.data;
        else this.user = res;
        this.name = this.user.name;
        this.ruc = this.user.ruc;
        this.phoneNumber = parseInt(this.user.phoneNumber);
        this.description = this.user.description;
        this.email = this.user.email;
        this.lastName = this.user.lastName;
    },
    methods: {
        validateEmail(email) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            return regex.test(email);
        },
        validatePhoneNumber(phoneNumber) {
            const regex = /^9\d{8}$/;
            return regex.test(phoneNumber);
        },
        validateSubscriptionPlan(subscriptionPlan) {
            return subscriptionPlan === "Free" || subscriptionPlan === "Premium"
        },
        getCustomerDto() {
            return {
                name: this.name,
                photo: this.imageDataHandler.data,
                ruc: this.ruc.toString(),
                phoneNumber: this.phoneNumber.toString(),
                description: this.description,
                email: this.email,
                password: null,
                lastName: this.lastName,
                subscriptionPlan: this.subscriptionPlan.code
            }
        },
        async handleSubmit(valid) {
            const actuallyValid = await this.v$.$validate();
            if(!this.imageDataHandler.data) {
                this.$toast.add({ severity: 'info', summary: 'Submit invalid', detail: 'You must upload an image' , life: 3000});
                return;
            }
            if(!actuallyValid){
                this.$toast.add({ severity: 'info', summary: 'Submit invalid', detail: 'There exists one or more fields which have invalida values' , life: 3000});
                return;
            }
            this.profileApiService.updateCustomerById(this.user.id, this.getCustomerDto())
                .then(response => {
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Customer Successfully updated",
                        life: 3000,
                    });
                    this.profileApiService.getCustomerById(this.user.id)
                        .then(response => {
                            localStorage.setItem("auth", JSON.stringify(response));
                            this.$emit("user-updated");
                        })
                })
                .catch( error => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Service Error",
                        detail: "And Error occured while trying to update the user",
                        life: 3000,
                    });
                    console.error(error);
                })
        },
        async uploadImage(event) {
            await this.imageConverter.upload(event, this.imageDataHandler);
        },
        logOut() {
            this.$emit("logout");
        },
        cancelChanges() {
            this.$emit("cancel-changes");
        }
    },
    validations() {
        return {
            name: { required },
            ruc: { 
                required, 
                minLength: minLength(11),
                maxLength: maxLength(11)
            },
            email: { 
                required,
                validateEmail: helpers.withMessage('Email is not valid', this.validateEmail)
            },
            phoneNumber: {
                required,
                validatePhoneNumber: helpers.withMessage('Phone Number must start with 9 and have 9 digits', this.validatePhoneNumber)
            },
            description: { required },
            lastName: { required },
            subscriptionPlan: { required }
        }
    }
}
</script>

<style scoped>
.edit-form {
    text-align: center;
}
.edit-profile-title {
    text-align: center;
}
.invalid {
    color: rgb(255, 0, 0);
    margin-top: 1rem;
}
</style>