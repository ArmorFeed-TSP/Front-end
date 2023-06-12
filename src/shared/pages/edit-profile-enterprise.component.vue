<template>
    <h3 class="edit-profile-title">Edit profile</h3>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="edit-form">
        <div class="flex flex-column gap-2">
            <label for="name" class="font-bold block mb-2">Name</label>
            <pv-input-text id="name" v-model="name"/>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="description" class="font-bold block mb-2">Description</label>
            <pv-input-text id="description" type="text" v-model="description"/>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="withoutgrouping" class="font-bold block mb-2">Phone Number</label>
            <pv-input-number v-model="phoneNumber" inputId="withoutgrouping" :useGrouping="false"/>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="email" class="font-bold block mb-2">Email</label>
            <pv-input-text id="email" type="text" v-model="email"/>
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
        <div class="flex-auto">
            <label for="minmaxfraction" class="font-bold block mb-2">Price Base</label>
            <pv-input-number v-model="priceBase" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5"></pv-input-number>
        </div>
        <pv-divider/>
        <div class="flex-auto">
            <label for="integeronly" class="font-bold block mb-2">Shipping Time</label>
            <pv-input-number v-model="shippingTime" inputId="integeronly"></pv-input-number>
        </div>
        <pv-divider/>
        <div class="flex-auto">
            <label for="integeronly" class="font-bold block mb-2">Score</label>
            <pv-input-number v-model="score" inputId="integeronly"></pv-input-number>
        </div>
        <pv-divider/>
        <pv-button type="submit" label="Save changes"></pv-button>
    </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, minValue, maxValue } from '@vuelidate/validators';
import { Base64Manager } from '../services/base64-uploader.service';
export default {
    name: "edit-profile-enterprise-component",
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
            priceBase: null,
            factorWeight: null,
            shippingTime: null,
            score: null,
            imageConverter: new Base64Manager(),
            imageDataHandler: { data: null },
            userType: null,
            user: null
        }
    },
    created() {
        this.userType = localStorage.getItem("type");
        this.user = JSON.parse(localStorage.getItem("auth"));
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
        getUserDto() {
            return {
                name: this.name,
                
            }
        },
        handleSubmit(valid) {
            console.log(valid);
            console.log(this.v$);
            if(valid)
                this.$emit("user-updated");
        },
        async uploadImage(event) {
            await this.imageConverter.upload(event, this.imageDataHandler);
        },
        logOut() {
            this.$emit("logout");
        }
    },
    validations() {
        return {
            name: { required },
            photo: { required },
            ruc: { 
                required, 
                minLength: minLength(11),
                maxLength: maxLength(11)
            },
            email: { 
                required,
                validateEmail: this.validateEmail
            },
            password: {
                password: { required },
                confirm: { required }
            },
            phoneNumber: {
                required,
                validatePhoneNumber: this.validatePhoneNumber
            },
            description: { required },
            priceBase: { required },
            factorWeight: { required },
            shippingTime: { required },
            score: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(5)
            }
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
</style>