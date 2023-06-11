<template>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <pv-input-text type="text" v-model="name"></pv-input-text>
        <pv-input-text type="text" v-model="description"></pv-input-text>
        <pv-input-number v-model="phoneNumber" inputId="integeronly"></pv-input-number>
    </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
export default {
    name: "profile-component",
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
            priceBase: null,
            factorWeight: null,
            shippingTime: null,
            score: null,
        }
    },
    props: {
        user: Object
    },
    mounted() {
        
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
        handleSubmit(invalid) {
            console.log(invalid);
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
            lastName: { required },
            subscriptionPlan: { 
                required, 
                validateSubscriptionPlan: this.validateSubscriptionPlan
            }
        }
    }
}
</script>

<style>

</style>